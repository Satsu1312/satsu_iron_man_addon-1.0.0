const Minecraft = Java.loadClass("net.minecraft.client.Minecraft");
const RenderSystem = Java.loadClass("com.mojang.blaze3d.systems.RenderSystem");
const ResourceLocation = Java.loadClass("net.minecraft.resources.ResourceLocation");
const GLFW = Java.loadClass("org.lwjgl.glfw.GLFW");
const Component = Java.loadClass("net.minecraft.network.chat.Component");

const TEX = {
  panel: "satsu_iron_man_addon:textures/gui/power/hud.png",
  slider: "satsu_iron_man_addon:textures/gui/power/slider_knob.png",
  button: "satsu_iron_man_addon:textures/gui/power/plaque.png",
  button_hovered: "satsu_iron_man_addon:textures/gui/power/plaque_hover.png"
};

const SLIDER_W = 8;
const SLIDER_H = 8;

const BAR_WIDTH = 140;
const BAR_HEIGHT = 4;

let sliderPos = { r: 0, g: 0, b: 0 };
let activeSlider = null;

let slidersInitialized = false;

function makeButton(w, h) {
  return { x: 0, y: 0, w: w, h: h, wasDown: false };
}
const applyButton = makeButton(60, 30);

function playClickSound() {
  const p = Minecraft.getInstance().player;
  if (p) p.playSound("minecraft:ui.button.click", 1.0, 1.0);
}

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function clickIn(mx, my, x, y, w, h) {
  return mx >= x && mx <= x + w && my >= y && my <= y + h;
}

function renderButton(btn, label, gui, mx, my, leftDown) {
  const hovered = clickIn(mx, my, btn.x, btn.y, btn.w, btn.h);

  gui.blit(
    new ResourceLocation(hovered ? TEX.button_hovered : TEX.button),
    btn.x, btn.y,
    0, 0,
    btn.w, btn.h,
    btn.w, btn.h
  );

  const mc = Minecraft.getInstance();
  const textWidth = mc.font.width(label);
  const textHeight = 9;
  const textX = btn.x + (btn.w - textWidth) / 2;
  const textY = btn.y + (btn.h - textHeight) / 2;

  palladium.gui.drawString(gui, Component.literal(label), textX, textY + 2, 0xffffff);

  const justPressed = leftDown && !btn.wasDown;
  btn.wasDown = leftDown;

  return justPressed && hovered;
}

function calculateRGB() {
  return {
    r: Math.round((sliderPos.r / BAR_WIDTH) * 255),
    g: Math.round((sliderPos.g / BAR_WIDTH) * 255),
    b: Math.round((sliderPos.b / BAR_WIDTH) * 255)
  };
}

function rgbToARGB(r, g, b) {
  return (255 << 24) | (r << 16) | (g << 8) | b;
}

function extractRGB(intVal) {
  return {
    r: (intVal >> 16) & 255,
    g: (intVal >> 8) & 255,
    b: intVal & 255
  };
}

function drawColorBar(gui, x, y, width, height, channel) {
  for (let i = 0; i < width; i++) {
    let t = i / (width - 1);
    let r = channel === "r" ? Math.floor(t * 255) : 0;
    let g = channel === "g" ? Math.floor(t * 255) : 0;
    let b = channel === "b" ? Math.floor(t * 255) : 0;
    let col = (255 << 24) | (r << 16) | (g << 8) | b;
    gui.fill(x + i, y, x + i + 1, y + height, col);
  }
}

function drawSlider(gui, barX, barY, channel) {
  const knobX = barX + sliderPos[channel] - (SLIDER_W / 2);
  const knobY = barY - 2;

  gui.blit(
    new ResourceLocation(TEX.slider),
    knobX, knobY,
    0, 0,
    SLIDER_W, SLIDER_H,
    SLIDER_W, SLIDER_H
  );
}

function initSlidersFromProperty(entity, power) {
  if (slidersInitialized) return;
  slidersInitialized = true;

  const propName = `satsu_iron_man_addon.${power}Colour`;
  const colourInt = (palladium.getProperty(entity, propName) | 0);

  const fallback = { r: 0, g: 86, b: 227 };
  const rgb = colourInt > 0 ? extractRGB(colourInt) : fallback;

  sliderPos.r = Math.round((rgb.r / 255) * BAR_WIDTH);
  sliderPos.g = Math.round((rgb.g / 255) * BAR_WIDTH);
  sliderPos.b = Math.round((rgb.b / 255) * BAR_WIDTH);
}

function getPowerColorProperty(power) {
  return `satsu_iron_man_addon.${power}Colour`;
}


const APPLY_PACKET = "satsu_set_power_color";

PalladiumEvents.renderPowerScreen((event) => {
  const mc = Minecraft.getInstance();
  const entity = mc.player;
  if (!entity) return;

  if (!event.tab || !event.tab.toString().includes("satsu_iron_man_addon:")) return;

  const gui = event.guiGraphics;
  const screen = event.screen;

  const power = event.tab.toString().replace("satsu_iron_man_addon:", "");

  const cx = screen.width / 2;
  const cy = screen.height / 2;

  const size = 257;
  const panelX = (cx - 126) | 0;
  const panelY = (cy - 100) | 0;

 
  gui.blit(
    new ResourceLocation(TEX.panel),
    panelX, panelY,
    0, 0,
    size, size,
    size, size
  );


  const barX = panelX + 40;
  const yR = panelY + 180;
  const yG = panelY + 192;
  const yB = panelY + 204;

  initSlidersFromProperty(entity, power);

 

  drawColorBar(gui, barX, yR, BAR_WIDTH, BAR_HEIGHT, "r");
  drawColorBar(gui, barX, yG, BAR_WIDTH, BAR_HEIGHT, "g");
  drawColorBar(gui, barX, yB, BAR_WIDTH, BAR_HEIGHT, "b");

 
  const mx = event.mouseX;
  const my = event.mouseY;

  const leftDown =
    GLFW.glfwGetMouseButton(mc.getWindow().getWindow(), GLFW.GLFW_MOUSE_BUTTON_LEFT)
    === GLFW.GLFW_PRESS;

  if (!leftDown) activeSlider = null;

  if (leftDown && activeSlider === null) {
    ["r", "g", "b"].forEach((ch) => {
      if (activeSlider) return;
      const yTop = (ch === "r" ? yR : (ch === "g" ? yG : yB));
      const knobX = barX + sliderPos[ch] - (SLIDER_W / 2);
      const knobY = yTop - 2;

      if (clickIn(mx, my, knobX, knobY, SLIDER_W, SLIDER_H)) {
        activeSlider = ch;
      }
    });
  }


  if (leftDown && activeSlider === null) {
    ["r", "g", "b"].forEach((ch) => {
      const yTop = (ch === "r" ? yR : (ch === "g" ? yG : yB));
      if (clickIn(mx, my, barX, yTop, BAR_WIDTH, BAR_HEIGHT)) {
        sliderPos[ch] = clamp(mx - barX, 0, BAR_WIDTH);
        activeSlider = ch;
      }
    });
  }

 
  if (leftDown && activeSlider !== null) {
    sliderPos[activeSlider] = clamp(mx - barX, 0, BAR_WIDTH);
  }

 
  drawSlider(gui, barX, yR, "r");
  drawSlider(gui, barX, yG, "g");
  drawSlider(gui, barX, yB, "b");

  const rgb = calculateRGB();
  const previewX = barX + BAR_WIDTH + 30;
  const previewY = yR + 2;
  gui.fill(previewX, previewY, previewX + 18, previewY + 18, rgbToARGB(rgb.r, rgb.g, rgb.b));


  applyButton.x = previewX - 20;
  applyButton.y = yR + 18;

  if (renderButton(applyButton, "Apply", gui, mx, my, leftDown)) {
    playClickSound();

    const hex = (rgb.r << 16) | (rgb.g << 8) | rgb.b;

    Client.player.sendData(satsu_apply_colour, {
      property: getPowerColorProperty(power),
      value: hex
    });
  }
});
