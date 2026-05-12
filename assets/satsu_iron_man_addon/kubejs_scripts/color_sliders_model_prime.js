let resetButtonClicked = false;
const Minecraft = Java.loadClass("net.minecraft.client.Minecraft");
const RenderSystem = Java.loadClass("com.mojang.blaze3d.systems.RenderSystem");
const ResourceLocation = Java.loadClass("net.minecraft.resources.ResourceLocation");
const GLFW = Java.loadClass("org.lwjgl.glfw.GLFW");
const MCComponent = Java.loadClass("net.minecraft.network.chat.Component");

const TEX = {
  panel: "satsu_iron_man_addon:textures/gui/power/hud.png",
  slider: "satsu_iron_man_addon:textures/gui/power/slider_knob.png",
  button: "satsu_iron_man_addon:textures/gui/power/plaque.png",
  button_hovered: "satsu_iron_man_addon:textures/gui/power/plaque_hover.png",
};

const BAR_WIDTH = 140;
const BAR_HEIGHT = 4;

let sliderPosPrimary = { r: 0, g: 0, b: 0 };
let sliderPosSecondary = { r: 0, g: 0, b: 0 };
let sliderPosTertiary = { r: 0, g: 0, b: 0 };
let sliderPosQuaternary = { r: 0, g: 0, b: 0 };
let sliderPosQuintenary = { r: 0, g: 0, b: 0 };

let activeMode = "Primary";
const MODES = ["Primary", "Secondary", "Tertiary", "Quaternary", "Quintenary"];

let activeSlider = null;
let slidersInitialized = false;
let hexInput = "";
let isEditingHex = false;
let lastKeyTime = 0;
let lastUpdateCheck = 0;
let lastInteractionTime = 0;

const modeButton = { x: 0, y: 0, w: 50, h: 20, wasDown: false };
const applyButton = { x: 0, y: 0, w: 40, h: 20, wasDown: false };
const resetButtonObj = { x: 0, y: 0, w: 40, h: 20, wasDown: false };

function rgbToHex(r, g, b) {
  const toHex = (c) => {
    const hex = Math.round(c).toString(16).toUpperCase();
    return hex.length == 1 ? "0" + hex : hex;
  };
  return toHex(r) + toHex(g) + toHex(b);
}

function updateSlidersFromHex(hex, sliderSet) {
  let cleanHex = hex.replace("#", "");
  if (cleanHex.length !== 6) return;
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  if (isNaN(r) || isNaN(g) || isNaN(b)) return;
  sliderSet.r = Math.round((r / 255) * BAR_WIDTH);
  sliderSet.g = Math.round((g / 255) * BAR_WIDTH);
  sliderSet.b = Math.round((b / 255) * BAR_WIDTH);
}

function playClickSound() {
  const p = Minecraft.getInstance().player;
  if (p) p.playSound("minecraft:ui.button.click", 1.0, 1.0);
}

function getModePropertyName() {
  const props = {
    "Primary": "satsu_iron_man_addon.PrimaryColour",
    "Secondary": "satsu_iron_man_addon.SecondaryColour",
    "Tertiary": "satsu_iron_man_addon.TertiaryColour",
    "Quaternary": "satsu_iron_man_addon_beam_core_color",
    "Quintenary": "satsu_iron_man_addon_beam_glow_color"
  };
  return props[activeMode];
}

function sendCurrentModeColorFromSliders() {
  const sliderSet = getModeSliderPos();
  const rgb = calculateRGB(sliderSet);
  const hex = (rgb.r << 16) | (rgb.g << 8) | rgb.b;
  Client.player.sendData("satsu_apply_color", { property: getModePropertyName(), value: hex });
}

function sendResetColor() {
  Client.player.sendData("satsu_reset_color", { property: getModePropertyName() });
}

function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }
function clickIn(mx, my, x, y, w, h) { return mx >= x && mx <= x + w && my >= y && my <= y + h; }

function renderButton(btn, label, gui, mx, my, leftDown) {
  const hovered = clickIn(mx, my, btn.x, btn.y, btn.w, btn.h);
  gui.blit(new ResourceLocation(hovered ? TEX.button_hovered : TEX.button), btn.x, btn.y, 0, 0, btn.w, btn.h, btn.w, btn.h);
  
  const mc = Minecraft.getInstance();
  const textX = btn.x + (btn.w - mc.font.width(label)) / 2;
  palladium.gui.drawString(gui, MCComponent.literal(label), textX, btn.y + (btn.h - 9) / 2 + 1, 0xffffff);
  
  const pressed = leftDown && !btn.wasDown && hovered;
  btn.wasDown = leftDown;
  return pressed;
}

function getModeSliderPos() {
  const sets = { 
    "Primary": sliderPosPrimary, 
    "Secondary": sliderPosSecondary, 
    "Tertiary": sliderPosTertiary, 
    "Quaternary": sliderPosQuaternary, 
    "Quintenary": sliderPosQuintenary 
  };
  return sets[activeMode];
}

function calculateRGB(sliderSet) {
  return {
    r: Math.round((sliderSet.r / BAR_WIDTH) * 255),
    g: Math.round((sliderSet.g / BAR_WIDTH) * 255),
    b: Math.round((sliderSet.b / BAR_WIDTH) * 255),
  };
}

function rgbToARGB(r, g, b) { return (255 << 24) | (r << 16) | (g << 8) | b; }
function extractRGB(intVal) { return { r: (intVal >> 16) & 255, g: (intVal >> 8) & 255, b: intVal & 255 }; }

function drawColorBar(gui, x, y, width, height, channel) {
  for (let i = 0; i < width; i++) {
    let t = i / (width - 1);
    let col = (255 << 24) | ((channel === "r" ? Math.floor(t * 255) : 0) << 16) | ((channel === "g" ? Math.floor(t * 255) : 0) << 8) | (channel === "b" ? Math.floor(t * 255) : 0);
    gui.fill(x + i, y, x + i + 1, y + height, col);
  }
}

function drawSlider(gui, barX, barY, channel, sliderSet) {
  gui.blit(new ResourceLocation(TEX.slider), barX + sliderSet[channel] - 4, barY - 2, 0, 0, 8, 8, 8, 8);
}

function initSlidersFromProperties(entity) {
  const fallback = { r: 0, g: 86, b: 227 };
  const mapping = [
    { id: "satsu_iron_man_addon.PrimaryColour", key: "sliderPosPrimary" },
    { id: "satsu_iron_man_addon.SecondaryColour", key: "sliderPosSecondary" },
    { id: "satsu_iron_man_addon.TertiaryColour", key: "sliderPosTertiary" },
    { id: "satsu_iron_man_addon_beam_core_color", key: "sliderPosQuaternary" },
    { id: "satsu_iron_man_addon_beam_glow_color", key: "sliderPosQuintenary" }
  ];
  mapping.forEach(m => {
    let val = palladium.getProperty(entity, m.id) | 0;
    let c = val > 0 ? extractRGB(val) : fallback;
    let target = (m.key === "sliderPosPrimary") ? sliderPosPrimary : (m.key === "sliderPosSecondary") ? sliderPosSecondary : (m.key === "sliderPosTertiary") ? sliderPosTertiary : (m.key === "sliderPosQuaternary") ? sliderPosQuaternary : sliderPosQuintenary;
    target.r = Math.round((c.r / 255) * BAR_WIDTH);
    target.g = Math.round((c.g / 255) * BAR_WIDTH);
    target.b = Math.round((c.b / 255) * BAR_WIDTH);
  });
}

const TABS = ["satsu_iron_man_addon:iron_man/marks/model_prime/main", "satsu_iron_man_addon:iron_man/marks/iron_legion_prototype/main", "satsu_iron_man_addon:iron_man/marks/model_72/main", "satsu_iron_man_addon:iron_man/marks/mark_extremis/main"];

TABS.forEach(tabID => {
  PalladiumEvents.renderPowerScreen((event) => {
    const mc = Minecraft.getInstance();
    const entity = mc.player;
    if (!entity || !event.tab || String(event.tab) !== tabID) return;

    const gui = event.guiGraphics;
    const cx = event.screen.width / 2, cy = event.screen.height / 2;
    const panelX = (cx - 126) | 0, panelY = (cy - 100) | 0;
    const barX = panelX + 40, yR = panelY + 200, yG = panelY + 210, yB = panelY + 220;

    gui.blit(new ResourceLocation(TEX.panel), panelX, panelY, 0, 0, 257, 257, 257, 257);
    
    const mx = event.mouseX, my = event.mouseY;
    const window = mc.getWindow().getWindow();
    const leftDown = GLFW.glfwGetMouseButton(window, GLFW.GLFW_MOUSE_BUTTON_LEFT) === GLFW.GLFW_PRESS;

    if (!slidersInitialized || (Date.now() - lastInteractionTime > 6000 && activeSlider === null && !leftDown)) {
        initSlidersFromProperties(entity);
        slidersInitialized = true;
        lastUpdateCheck = Date.now();
        lastInteractionTime = Date.now();
    }
    
    const sliderPos = getModeSliderPos();

    if (!leftDown) { 
        activeSlider = null; 
        resetButtonClicked = false;
    }
    
    if (leftDown && activeSlider === null) {
      ["r", "g", "b"].forEach(ch => {
        const y = ch === "r" ? yR : ch === "g" ? yG : yB;
        if (clickIn(mx, my, barX, y, BAR_WIDTH, 4)) {
            activeSlider = ch;
            lastInteractionTime = Date.now();
        }
      });
    }
    if (leftDown && activeSlider !== null) {
        sliderPos[activeSlider] = clamp(mx - barX, 0, BAR_WIDTH);
        isEditingHex = false;
        lastInteractionTime = Date.now();
    }

    const previewX = barX + BAR_WIDTH + 30;
    const hexY = yR + 20;
    const isHoveringText = clickIn(mx, my, previewX - 5, hexY - 2, 50, 10);
   
    if (isHoveringText) {
      let ctrlDown = GLFW.glfwGetKey(window, GLFW.GLFW_KEY_LEFT_CONTROL) === GLFW.GLFW_PRESS || GLFW.glfwGetKey(window, GLFW.GLFW_KEY_RIGHT_CONTROL) === GLFW.GLFW_PRESS;
      
      if (ctrlDown && GLFW.glfwGetKey(window, GLFW.GLFW_KEY_V) === GLFW.GLFW_PRESS && Date.now() - lastKeyTime > 200) {
        let clipboard = mc.keyboardHandler.getClipboard();
        if (clipboard) {
          let clean = clipboard.replace("#", "").trim();
          if (/^[0-9A-Fa-f]{6}$/.test(clean)) {
            hexInput = clean.toUpperCase();
            updateSlidersFromHex(hexInput, sliderPos);
            isEditingHex = false;
            lastKeyTime = Date.now();
            lastInteractionTime = Date.now();
          }
        }
      }

      let isEnter = GLFW.glfwGetKey(window, 257) === 1 || GLFW.glfwGetKey(window, 335) === 1;
      let isSpace = GLFW.glfwGetKey(window, 32) === 1;

      if ((isEnter || isSpace) && Date.now() - lastKeyTime > 250) {
        if (hexInput.length === 6) {
          updateSlidersFromHex(hexInput, sliderPos);
          playClickSound();
          sendCurrentModeColorFromSliders();
          isEditingHex = false;
          lastInteractionTime = Date.now();
        }
        lastKeyTime = Date.now();
      }

      for (let i = 48; i <= 90; i++) {
        if (GLFW.glfwGetKey(window, i) === GLFW.GLFW_PRESS) {
          let char = String.fromCharCode(i);
          if (/[0-9A-F]/.test(char) && Date.now() - lastKeyTime > 150) {
            if(!isEditingHex) {
                hexInput = "";
                isEditingHex = true;
            }
            hexInput = (hexInput + char).slice(-6);
            if (hexInput.length === 6) {
                updateSlidersFromHex(hexInput, sliderPos);
            }
            lastKeyTime = Date.now();
            lastInteractionTime = Date.now();
          }
        }
      }
      if (GLFW.glfwGetKey(window, GLFW.GLFW_KEY_BACKSPACE) === GLFW.GLFW_PRESS && Date.now() - lastKeyTime > 150) {
        isEditingHex = true;
        hexInput = hexInput.slice(0, -1);
        lastKeyTime = Date.now();
        lastInteractionTime = Date.now();
      }
    } else {
      if (!isEditingHex) {
        hexInput = rgbToHex(calculateRGB(sliderPos).r, calculateRGB(sliderPos).g, calculateRGB(sliderPos).b);
      }
    }

    ["r", "g", "b"].forEach(ch => {
      const y = ch === "r" ? yR : ch === "g" ? yG : yB;
      drawColorBar(gui, barX, y, BAR_WIDTH, BAR_HEIGHT, ch);
      drawSlider(gui, barX, y, ch, sliderPos);
    });

    const rgb = calculateRGB(sliderPos);
    const displayText = isHoveringText ? "> #" + hexInput : "#" + hexInput;
    palladium.gui.drawString(gui, MCComponent.literal(displayText), previewX - 5, hexY, isHoveringText ? 0xFFFF00 : 0xFFFFFF);

    gui.fill(previewX, yR + 2, previewX + 18, yR + 20, rgbToARGB(rgb.r, rgb.g, rgb.b));

    const totalWidth = modeButton.w + applyButton.w + resetButtonObj.w + 10;
    const startX = barX + (BAR_WIDTH - totalWidth) / 2 + 30;

    modeButton.x = startX; 
    modeButton.y = yR + 30;

    applyButton.x = modeButton.x + modeButton.w + 5; 
    applyButton.y = modeButton.y;

    resetButtonObj.x = applyButton.x + applyButton.w + 5; 
    resetButtonObj.y = modeButton.y;

    if (renderButton(modeButton, activeMode, gui, mx, my, leftDown)) {
      playClickSound();
      let nextIndex = (MODES.indexOf(activeMode) + 1) % MODES.length;
      activeMode = MODES[nextIndex];
      isEditingHex = false;
      lastInteractionTime = Date.now();
    }

    if (renderButton(applyButton, "Apply", gui, mx, my, leftDown)) { 
      playClickSound(); 
      sendCurrentModeColorFromSliders();
      isEditingHex = false;
      lastInteractionTime = Date.now();
    }
   
    if (renderButton(resetButtonObj, "Reset", gui, mx, my, leftDown)) {
      playClickSound(); 
      sendResetColor();
      initSlidersFromProperties(entity);
      isEditingHex = false;
      lastInteractionTime = 0; 
      return; 
    }
  });
});