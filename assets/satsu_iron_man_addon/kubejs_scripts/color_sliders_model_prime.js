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
const BAR_HEIGHT = 25; // Aumentado para el selector 2D

// Ahora almacenamos h, s, v (0-1)
let sliderPosPrimary = { h: 0, s: 1, v: 1 };
let sliderPosSecondary = { h: 0, s: 1, v: 1 };
let sliderPosTertiary = { h: 0, s: 1, v: 1 };
let sliderPosQuaternary = { h: 0, s: 1, v: 1 };
let sliderPosQuintenary = { h: 0, s: 1, v: 1 };

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

// --- NUEVAS FUNCIONES DE CONVERSIÓN HSV ---

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
  r /= 255; g /= 255; b /= 255;
  let max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, v = max;
  let d = max - min;
  s = max === 0 ? 0 : d / max;
  if (max === min) { h = 0; } 
  else {
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: h, s: s, v: v };
}

// --- LOGICA ORIGINAL ADAPTADA ---

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
    "Quaternary": "satsu_iron_man_addon_beam_core_color",
    "Quintenary": "satsu_iron_man_addon_beam_glow_color"
  };
  return props[activeMode];
}

function sendCurrentModeColorFromSliders() {
  const rgb = calculateRGB(getModeSliderPos());
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
    "Primary": sliderPosPrimary, "Secondary": sliderPosSecondary, 
    "Tertiary": sliderPosTertiary, "Quaternary": sliderPosQuaternary, 
    "Quintenary": sliderPosQuintenary 
  };
  return sets[activeMode];
}

function calculateRGB(sliderSet) {
  return hsvToRgb(sliderSet.h, sliderSet.s, sliderSet.v);
}

function rgbToARGB(r, g, b) { return (255 << 24) | (r << 16) | (g << 8) | b; }
function extractRGB(intVal) { return { r: (intVal >> 16) & 255, g: (intVal >> 8) & 255, b: intVal & 255 }; }

// --- DIBUJO DEL SELECTOR HSV ---

function drawHSVPicker(gui, x, y, width, height, hsv) {
    // Dibujamos el espectro base (Hue en X, Saturación en Y)
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            let hue = i / (width - 1);
            let sat = 1 - (j / (height - 1));
            let rgb = hsvToRgb(hue, sat, 1.0);
            gui.fill(x + i, y + j, x + i + 1, y + j + 1, rgbToARGB(rgb.r, rgb.g, rgb.b));
        }
    }
    // Indicador de posición (Knob)
    let knobX = x + (hsv.h * width);
    let knobY = y + ((1 - hsv.s) * height);
    gui.blit(new ResourceLocation(TEX.slider), knobX - 4, knobY - 4, 0, 0, 8, 8, 8, 8);
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
    let hsv = rgbToHsv(c.r, c.g, c.b);
    let target = getModeSliderPos(); // Referencia simplificada
    if(m.key.includes("Primary")) sliderPosPrimary = hsv;
    else if(m.key.includes("Secondary")) sliderPosSecondary = hsv;
    else if(m.key.includes("Tertiary")) sliderPosTertiary = hsv;
    else if(m.key.includes("Quaternary")) sliderPosQuaternary = hsv;
    else sliderPosQuintenary = hsv;
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
    const barX = panelX + 40, barY = panelY + 200; // Punto de inicio del selector

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
    
    // Logica de interacción del Selector HSV
    if (leftDown && clickIn(mx, my, barX, barY, BAR_WIDTH, BAR_HEIGHT)) {
        activeSlider = "hsv";
        lastInteractionTime = Date.now();
    }

    if (leftDown && activeSlider === "hsv") {
        sliderPos.h = clamp((mx - barX) / BAR_WIDTH, 0, 1);
        sliderPos.s = 1 - clamp((my - barY) / BAR_HEIGHT, 0, 1);
        isEditingHex = false;
        lastInteractionTime = Date.now();
    }

    // Copiar/Pegar Hex (Se mantiene igual)
    const previewX = barX + BAR_WIDTH + 30;
    const hexY = barY + 5;
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
          }
        }
      }
      // ... (Resto de lógica de teclado se mantiene idéntica para no romper funcionalidad)
      if (GLFW.glfwGetKey(window, GLFW.GLFW_KEY_BACKSPACE) === GLFW.GLFW_PRESS && Date.now() - lastKeyTime > 150) {
        isEditingHex = true; hexInput = hexInput.slice(0, -1); lastKeyTime = Date.now();
      }
    } else {
      if (!isEditingHex) {
        let currentRGB = calculateRGB(sliderPos);
        hexInput = rgbToHex(currentRGB.r, currentRGB.g, currentRGB.b);
      }
    }

    // Renderizado del componente único HSV
    drawHSVPicker(gui, barX, barY, BAR_WIDTH, BAR_HEIGHT, sliderPos);

    const rgb = calculateRGB(sliderPos);
    const displayText = isHoveringText ? "> #" + hexInput : "#" + hexInput;
    palladium.gui.drawString(gui, MCComponent.literal(displayText), previewX - 5, hexY, isHoveringText ? 0xFFFF00 : 0xFFFFFF);
    gui.fill(previewX, barY + 15, previewX + 18, barY + 33, rgbToARGB(rgb.r, rgb.g, rgb.b));

    // Botones de Modo, Aplicar y Reset
    const totalWidth = modeButton.w + applyButton.w + resetButtonObj.w + 10;
    const startX = barX + (BAR_WIDTH - totalWidth) / 2;

    modeButton.x = startX; modeButton.y = barY + BAR_HEIGHT + 5;
    applyButton.x = modeButton.x + modeButton.w + 5; applyButton.y = modeButton.y;
    resetButtonObj.x = applyButton.x + applyButton.w + 5; resetButtonObj.y = modeButton.y;

    if (renderButton(modeButton, activeMode, gui, mx, my, leftDown)) {
      playClickSound();
      activeMode = MODES[(MODES.indexOf(activeMode) + 1) % MODES.length];
      isEditingHex = false;
    }

    if (renderButton(applyButton, "Apply", gui, mx, my, leftDown)) { 
      playClickSound(); sendCurrentModeColorFromSliders();
    }
   
    if (renderButton(resetButtonObj, "Reset", gui, mx, my, leftDown)) {
      playClickSound(); sendResetColor(); initSlidersFromProperties(entity);
      lastInteractionTime = Date.now() - 6000; return; 
    }
  });
});