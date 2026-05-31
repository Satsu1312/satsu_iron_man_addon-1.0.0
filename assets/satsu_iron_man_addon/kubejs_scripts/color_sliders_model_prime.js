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

// Variables de estado interno usando HSV (hue, saturation, value)
let sliderPosPrimary = { h: 0, s: 0, v: 0 };
let sliderPosSecondary = { h: 0, s: 0, v: 0 };
let sliderPosTertiary = { h: 0, s: 0, v: 0 };
let sliderPosCore = { h: 0, s: 0, v: 0 };
let sliderPosRepulsor = { h: 0, s: 0, v: 0 };

let activeMode = "Primary";
const MODES = ["Primary", "Secondary", "Tertiary", "Core", "Repulsor"];

let activePicker = null; 
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

// Funciones utilitarias para conversión RGB <-> HSV
function hsvToRgb(h, s, v) {
  let r, g, b;
  let i = Math.floor(h * 6);
  let f = h * 6 - i;
  let p = v * (1 - s);
  let q = v * (1 - f * s);
  let t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0: r = v, g = t, b = p; break;
    case 1: r = q, g = v, b = p; break;
    case 2: r = p, g = v, b = t; break;
    case 3: r = p, g = q, b = v; break;
    case 4: r = t, g = p, b = v; break;
    case 5: r = v, g = p, b = q; break;
  }
  return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}

function rgbToHsv(r, g, b) {
  r /= 255, g /= 255, b /= 255;
  let max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, v = max;
  let d = max - min;
  s = max === 0 ? 0 : d / max;
  if (max === min) {
    h = 0; 
  } else {
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: h, s: s, v: v };
}

function updateSlidersFromHex(hex, sliderSet) {
  let cleanHex = hex.replace("#", "");
  if (cleanHex.length !== 6) return;
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  if (isNaN(r) || isNaN(g) || isNaN(b)) return;
  
  let hsv = rgbToHsv(r, g, b);
  sliderSet.h = hsv.h;
  sliderSet.s = hsv.s;
  sliderSet.v = hsv.v;
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
    "Core": "satsu_iron_man_addon_beam_core_color",
    "Repulsor": "satsu_iron_man_addon_beam_glow_color"
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
    "Core": sliderPosCore, 
    "Repulsor": sliderPosRepulsor 
  };
  return sets[activeMode];
}

function calculateRGB(sliderSet) {
  return hsvToRgb(sliderSet.h, sliderSet.s, sliderSet.v);
}

function rgbToARGB(r, g, b) { return (255 << 24) | (r << 16) | (g << 8) | b; }
function extractRGB(intVal) { return { r: (intVal >> 16) & 255, g: (intVal >> 8) & 255, b: intVal & 255 }; }

function initSlidersFromProperties(entity) {
  const fallback = { r: 0, g: 86, b: 227 };
  const mapping = [
    { id: "satsu_iron_man_addon.PrimaryColour", key: "sliderPosPrimary" },
    { id: "satsu_iron_man_addon.SecondaryColour", key: "sliderPosSecondary" },
    { id: "satsu_iron_man_addon.TertiaryColour", key: "sliderPosTertiary" },
    { id: "satsu_iron_man_addon_beam_core_color", key: "sliderPosCore" },
    { id: "satsu_iron_man_addon_beam_glow_color", key: "sliderPosRepulsor" }
  ];
  mapping.forEach(m => {
    let val = palladium.getProperty(entity, m.id) | 0;
    let c = val > 0 ? extractRGB(val) : fallback;
    let target = (m.key === "sliderPosPrimary") ? sliderPosPrimary : (m.key === "sliderPosSecondary") ? sliderPosSecondary : (m.key === "sliderPosTertiary") ? sliderPosTertiary : (m.key === "sliderPosCore") ? sliderPosCore : sliderPosRepulsor;
    
    let hsv = rgbToHsv(c.r, c.g, c.b);
    target.h = hsv.h;
    target.s = hsv.s;
    target.v = hsv.v;
  });
}

const TABS = ["satsu_iron_man_addon:iron_man/marks/model_prime/main", "satsu_iron_man_addon:iron_man/marks/iron_legion_prototype/main", "satsu_iron_man_addon:iron_man/marks/model_72/main", "satsu_iron_man_addon:iron_man/marks/mark_extremis/main", "satsu_iron_man_addon:big_shot_suit/main", "satsu_iron_man_addon:iron_man/marks/infamous/main"];

TABS.forEach(tabID => {
  PalladiumEvents.renderPowerScreen((event) => {
    const mc = Minecraft.getInstance();
    const entity = mc.player;
    if (!entity || !event.tab || String(event.tab) !== tabID) return;

    const gui = event.guiGraphics;
    const cx = event.screen.width / 2, cy = event.screen.height / 2;
    const panelX = (cx - 126) | 0, panelY = (cy - 100) | 0;
    
    // Dimensiones y Layout del nuevo Color Picker
    const barX = panelX + 40, yR = panelY + 200;
    const PICKER_W = 126, PICKER_H = 26; // Picker levemente más ancho para compensar la barra fina
    const HUE_W = 6, HUE_H = 26; // Barra de tono más delgada
    const hueX = barX + PICKER_W + 8; // Total: 126 (picker) + 8 (separación) + 6 (barra) = 140 (BAR_WIDTH)

    gui.blit(new ResourceLocation(TEX.panel), panelX, panelY, 0, 0, 257, 257, 257, 257);
    
    const mx = event.mouseX, my = event.mouseY;
    const window = mc.getWindow().getWindow();
    const leftDown = GLFW.glfwGetMouseButton(window, GLFW.GLFW_MOUSE_BUTTON_LEFT) === GLFW.GLFW_PRESS;

    if (!slidersInitialized || (Date.now() - lastInteractionTime > 6000 && activePicker === null && !leftDown)) {
        initSlidersFromProperties(entity);
        slidersInitialized = true;
        lastUpdateCheck = Date.now();
        lastInteractionTime = Date.now();
    }
    
    const sliderPos = getModeSliderPos();

    if (!leftDown) { 
        activePicker = null; 
        resetButtonClicked = false;
    }
    
    // Lógica de detección de clics
    if (leftDown && activePicker === null) {
      if (clickIn(mx, my, barX, yR, PICKER_W, PICKER_H)) {
          activePicker = "sv";
          lastInteractionTime = Date.now();
      } else if (clickIn(mx, my, hueX - 2, yR, HUE_W + 4, HUE_H)) { // Hitbox ampliada para clics fáciles en la barra delgada
          activePicker = "h";
          lastInteractionTime = Date.now();
      }
    }

    if (leftDown && activePicker !== null) {
        if (activePicker === "sv") {
            sliderPos.s = clamp((mx - barX) / PICKER_W, 0, 1);
            sliderPos.v = 1 - clamp((my - yR) / PICKER_H, 0, 1);
        } else if (activePicker === "h") {
            sliderPos.h = 1 - clamp((my - yR) / HUE_H, 0, 1);
        }
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

      if (ctrlDown && GLFW.glfwGetKey(window, GLFW.GLFW_KEY_C) === GLFW.GLFW_PRESS && Date.now() - lastKeyTime > 200) {
        mc.keyboardHandler.setClipboard("#" + hexInput);
        lastKeyTime = Date.now();
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

    // 1. Renderizado del Cuadro 2D de Saturación / Valor (Brillo)
    let step = 2; // Iterar cada 2 píxeles por rendimiento en GUI
    for (let dx = 0; dx < PICKER_W; dx += step) {
      for (let dy = 0; dy < PICKER_H; dy += step) {
        let s = dx / PICKER_W;
        let v = 1 - (dy / PICKER_H);
        let rgbBox = hsvToRgb(sliderPos.h, s, v);
        gui.fill(barX + dx, yR + dy, Math.min(barX + dx + step, barX + PICKER_W), Math.min(yR + dy + step, yR + PICKER_H), rgbToARGB(rgbBox.r, rgbBox.g, rgbBox.b));
      }
    }
    // Indicador (Knob) del Cuadro SV
    let kx = barX + sliderPos.s * PICKER_W;
    let ky = yR + (1 - sliderPos.v) * PICKER_H;
    gui.blit(new ResourceLocation(TEX.slider), kx - 4, ky - 4, 0, 0, 8, 8, 8, 8);

    // 2. Renderizado de la Barra Lateral de Tono (Hue)
    for (let dy = 0; dy < HUE_H; dy++) {
      let hueVal = 1 - (dy / HUE_H);
      let rgbHue = hsvToRgb(hueVal, 1, 1);
      gui.fill(hueX, yR + dy, hueX + HUE_W, yR + dy + 1, rgbToARGB(rgbHue.r, rgbHue.g, rgbHue.b));
    }
    // Indicador (Knob) de la Barra Hue (Centrado sobre la barra delgada)
    let hkY = yR + (1 - sliderPos.h) * HUE_H;
    gui.blit(new ResourceLocation(TEX.slider), hueX - 1, hkY - 4, 0, 0, 8, 8, 8, 8);

    const rgb = calculateRGB(sliderPos);
    const displayText = isHoveringText ? "> #" + hexInput : "#" + hexInput;
    palladium.gui.drawString(gui, MCComponent.literal(displayText), previewX - 5, hexY, isHoveringText ? 0xFFFF00 : 0xFFFFFF);

    gui.fill(previewX, yR + 2, previewX + 18, yR + 20, rgbToARGB(rgb.r, rgb.g, rgb.b));

    const totalWidth = modeButton.w + applyButton.w + resetButtonObj.w + 10;
    const startX = barX + (BAR_WIDTH - totalWidth) / 2 - 0;

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
      lastInteractionTime = Date.now() - 6000; 
      return; 
    }
  });
});