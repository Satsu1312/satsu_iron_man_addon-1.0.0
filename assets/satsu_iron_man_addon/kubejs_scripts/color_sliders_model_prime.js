let resetButtonClicked = false;
const Minecraft = Java.loadClass("net.minecraft.client.Minecraft");
const RenderSystem = Java.loadClass("com.mojang.blaze3d.systems.RenderSystem");
const ResourceLocation = Java.loadClass("net.minecraft.resources.ResourceLocation");
const GLFW = Java.loadClass("org.lwjgl.glfw.GLFW");
const MCComponent = Java.loadClass("net.minecraft.network.chat.Component");

const TEX = {
  panel: "satsu_iron_man_addon:textures/gui/power/hud.png",
  button: "satsu_iron_man_addon:textures/gui/power/plaque.png",
  button_hovered: "satsu_iron_man_addon:textures/gui/power/plaque_hover.png",
};

const PICKER_SIZE = 50; 
const HUE_BAR_WIDTH = 8;

let selectorPosPrimary = { x: PICKER_SIZE, y: 0, h: 0 };
let selectorPosSecondary = { x: PICKER_SIZE, y: 0, h: 0 };
let selectorPosTertiary = { x: PICKER_SIZE, y: 0, h: 0 };
let selectorPosQuaternary = { x: PICKER_SIZE, y: 0, h: 0 };
let selectorPosQuintenary = { x: PICKER_SIZE, y: 0, h: 0 };

let activeMode = "Primary";
const MODES = ["Primary", "Secondary", "Tertiary", "Quaternary", "Quintenary"];

let activeSelector = null;
let selectorsInitialized = false;
let hexInput = "";
let isEditingHex = false;
let lastKeyTime = 0;
let lastInteractionTime = 0;

const modeButton = { x: 0, y: 0, w: 56, h: 14, wasDown: false };
const applyButton = { x: 0, y: 0, w: 56, h: 14, wasDown: false };
const resetButtonObj = { x: 0, y: 0, w: 56, h: 14, wasDown: false };

function hsvToRgb(h, s, v) {
  let r, g, b, i = Math.floor(h * 6), f = h * 6 - i, p = v * (1 - s), q = v * (1 - f * s), t = v * (1 - (1 - f) * s);
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
  let max = Math.max(r, g, b), min = Math.min(r, g, b), h, s, v = max, d = max - min;
  s = max === 0 ? 0 : d / max;
  if (max === min) h = 0;
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

function rgbToHex(r, g, b) {
  const toHex = (c) => { let h = Math.round(c).toString(16).toUpperCase(); return h.length == 1 ? "0" + h : h; };
  return toHex(r) + toHex(g) + toHex(b);
}

function updateFromHex(hex, selectorSet) {
  let clean = hex.replace("#", "");
  if (clean.length !== 6) return;
  const r = parseInt(clean.substring(0, 2), 16), g = parseInt(clean.substring(2, 4), 16), b = parseInt(clean.substring(4, 6), 16);
  if (isNaN(r) || isNaN(g) || isNaN(b)) return;
  let hsv = rgbToHsv(r, g, b);
  selectorSet.x = Math.round(hsv.s * PICKER_SIZE);
  selectorSet.y = Math.round((1 - hsv.v) * PICKER_SIZE);
  selectorSet.h = hsv.h;
}

function getModePropertyName() {
  const props = { "Primary": "satsu_iron_man_addon.PrimaryColour", "Secondary": "satsu_iron_man_addon.SecondaryColour", "Tertiary": "satsu_iron_man_addon.TertiaryColour", "Quaternary": "satsu_iron_man_addon_beam_core_color", "Quintenary": "satsu_iron_man_addon_beam_glow_color" };
  return props[activeMode];
}

function getModeSelectorPos() {
  const sets = { "Primary": selectorPosPrimary, "Secondary": selectorPosSecondary, "Tertiary": selectorPosTertiary, "Quaternary": selectorPosQuaternary, "Quintenary": selectorPosQuintenary };
  return sets[activeMode];
}

function calculateRGB(selectorSet) { return hsvToRgb(selectorSet.h, selectorSet.x / PICKER_SIZE, 1 - (selectorSet.y / PICKER_SIZE)); }
function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }
function clickIn(mx, my, x, y, w, h) { return mx >= x && mx <= x + w && my >= y && my <= y + h; }

function renderButton(btn, label, gui, mx, my, leftDown) {
  const hovered = clickIn(mx, my, btn.x, btn.y, btn.w, btn.h);
  gui.blit(new ResourceLocation(hovered ? TEX.button_hovered : TEX.button), btn.x, btn.y, 0, 0, btn.w, btn.h, btn.w, btn.h);
  const mc = Minecraft.getInstance();
  palladium.gui.drawString(gui, MCComponent.literal(label), btn.x + (btn.w - mc.font.width(label)) / 2, btn.y + (btn.h - 9) / 2 + 1, 0xffffff);
  const pressed = leftDown && !btn.wasDown && hovered;
  btn.wasDown = leftDown;
  return pressed;
}

function initFromProperties(entity) {
  const mapping = [
    { id: "satsu_iron_man_addon.PrimaryColour", key: selectorPosPrimary },
    { id: "satsu_iron_man_addon.SecondaryColour", key: selectorPosSecondary },
    { id: "satsu_iron_man_addon.TertiaryColour", key: selectorPosTertiary },
    { id: "satsu_iron_man_addon_beam_core_color", key: selectorPosQuaternary },
    { id: "satsu_iron_man_addon_beam_glow_color", key: selectorPosQuintenary }
  ];
  mapping.forEach(m => {
    let val = palladium.getProperty(entity, m.id) | 0;
    let c = val > 0 ? { r: (val >> 16) & 255, g: (val >> 8) & 255, b: val & 255 } : { r: 0, g: 86, b: 227 };
    let hsv = rgbToHsv(c.r, c.g, c.b);
    m.key.x = Math.round(hsv.s * PICKER_SIZE);
    m.key.y = Math.round((1 - hsv.v) * PICKER_SIZE);
    m.key.h = hsv.h;
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

    const pickerX = panelX + 145, pickerY = panelY + 200, hueX = pickerX + PICKER_SIZE + 5;

    gui.blit(new ResourceLocation(TEX.panel), panelX, panelY, 0, 0, 257, 257, 257, 257);
    const mx = event.mouseX, my = event.mouseY, window = mc.getWindow().getWindow();
    const leftDown = GLFW.glfwGetMouseButton(window, GLFW.GLFW_MOUSE_BUTTON_LEFT) === GLFW.GLFW_PRESS;

    if (!selectorsInitialized || (Date.now() - lastInteractionTime > 6000 && activeSelector === null && !leftDown)) {
        initFromProperties(entity); selectorsInitialized = true; lastInteractionTime = Date.now();
    }
    
    const pos = getModeSelectorPos();
    if (!leftDown) { activeSelector = null; }
    if (leftDown && activeSelector === null) {
        if (clickIn(mx, my, pickerX, pickerY, PICKER_SIZE, PICKER_SIZE)) activeSelector = "picker";
        else if (clickIn(mx, my, hueX, pickerY, HUE_BAR_WIDTH, PICKER_SIZE)) activeSelector = "hue";
    }
    if (leftDown && activeSelector !== null) {
        if (activeSelector === "picker") { pos.x = clamp(mx - pickerX, 0, PICKER_SIZE); pos.y = clamp(my - pickerY, 0, PICKER_SIZE); }
        else if (activeSelector === "hue") { pos.h = clamp(my - pickerY, 0, PICKER_SIZE) / PICKER_SIZE; }
        isEditingHex = false; lastInteractionTime = Date.now();
    }

    const previewX = hueX + HUE_BAR_WIDTH + 8;
    const isHoveringText = clickIn(mx, my, previewX - 2, pickerY + 12, 40, 10);
   
    if (isHoveringText) {
      let ctrl = GLFW.glfwGetKey(window, 341) === 1 || GLFW.glfwGetKey(window, 345) === 1;
      if (ctrl && GLFW.glfwGetKey(window, 86) === 1 && Date.now() - lastKeyTime > 200) {
        let cb = mc.keyboardHandler.getClipboard();
        if (cb) { let clean = cb.replace("#", "").trim(); if (/^[0-9A-Fa-f]{6}$/.test(clean)) { hexInput = clean.toUpperCase(); updateFromHex(hexInput, pos); lastKeyTime = Date.now(); } }
      }
      for (let i = 48; i <= 90; i++) {
        if (GLFW.glfwGetKey(window, i) === 1 && Date.now() - lastKeyTime > 150) {
          if(!isEditingHex) { hexInput = ""; isEditingHex = true; }
          hexInput = (hexInput + String.fromCharCode(i)).slice(-6);
          if (hexInput.length === 6) updateFromHex(hexInput, pos);
          lastKeyTime = Date.now();
        }
      }
    } else if (!isEditingHex) { let r = calculateRGB(pos); hexInput = rgbToHex(r.r, r.g, r.b); }

    for (let s = 0; s < PICKER_SIZE; s++) {
      for (let v = 0; v < PICKER_SIZE; v++) {
        let c = hsvToRgb(pos.h, s / (PICKER_SIZE - 1), 1 - (v / (PICKER_SIZE - 1)));
        gui.fill(pickerX + s, pickerY + v, pickerX + s + 1, pickerY + v + 1, (255 << 24) | (c.r << 16) | (c.g << 8) | c.b);
      }
    }
    for (let i = 0; i < PICKER_SIZE; i++) {
      let c = hsvToRgb(i / (PICKER_SIZE - 1), 1, 1);
      gui.fill(hueX, pickerY + i, hueX + HUE_BAR_WIDTH, pickerY + i + 1, (255 << 24) | (c.r << 16) | (c.g << 8) | c.b);
    }

    gui.fill(pickerX + pos.x - 1, pickerY + pos.y - 1, pickerX + pos.x + 1, pickerY + pos.y + 1, 0xFFFFFFFF);
    gui.fill(hueX - 1, pickerY + (pos.h * PICKER_SIZE) - 1, hueX + HUE_BAR_WIDTH + 1, pickerY + (pos.h * PICKER_SIZE) + 1, 0xFFFFFFFF);

    const rgb = calculateRGB(pos);
    palladium.gui.drawString(gui, MCComponent.literal(isHoveringText ? ">#" + hexInput : "#" + hexInput), previewX - 2, pickerY + 18, isHoveringText ? 0xFFFF00 : 0xFFFFFF);
    gui.fill(previewX, pickerY, previewX + 12, pickerY + 12, (255 << 24) | (rgb.r << 16) | (rgb.g << 8) | rgb.b);

    modeButton.x = pickerX - 62; modeButton.y = pickerY;
    applyButton.x = modeButton.x; applyButton.y = modeButton.y + 16;
    resetButtonObj.x = modeButton.x; resetButtonObj.y = applyButton.y + 16;

    if (renderButton(modeButton, activeMode, gui, mx, my, leftDown)) { activeMode = MODES[(MODES.indexOf(activeMode) + 1) % MODES.length]; isEditingHex = false; }
    if (renderButton(applyButton, "Apply", gui, mx, my, leftDown)) {
        const r = calculateRGB(pos);
        Client.player.sendData("satsu_apply_color", { property: getModePropertyName(), value: (r.r << 16) | (r.g << 8) | r.b });
    }
    if (renderButton(resetButtonObj, "Reset", gui, mx, my, leftDown)) {
        Client.player.sendData("satsu_reset_color", { property: getModePropertyName() });
        initFromProperties(entity); lastInteractionTime = Date.now() - 6000;
    }
  });
});