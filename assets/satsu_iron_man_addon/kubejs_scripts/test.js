const Minecraft = Java.loadClass("net.minecraft.client.Minecraft");
const RenderSystem = Java.loadClass("com.mojang.blaze3d.systems.RenderSystem");
const ResourceLocation = Java.loadClass("net.minecraft.resources.ResourceLocation");

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

PalladiumEvents.renderPowerScreen((event) => {
  const mc = Minecraft.getInstance();
  const entity = mc.player;
  if (!entity) return;

  if (!event.tab || !event.tab.toString().includes("satsu_iron_man_addon:")) return;

  const gui = event.guiGraphics;
  const screen = event.screen;

  const cx = screen.width / 2;
  const cy = screen.height / 2;

  const size = 257;

  const panelX = cx - 126;
  const panelY = cy - 100;

 
  gui.blit(
    new ResourceLocation("satsu_iron_man_addon:textures/gui/power/new_hud.png"),
    panelX,
    panelY,
    0,
    0,
    size,
    size,
    size,
    size
  );

 
  const barWidth = 140;
  const barX = panelX + 40;

  const yR = panelY + 204;
  const yG = panelY + 216;
  const yB = panelY + 228;

 
  drawColorBar(gui, barX, yR, barWidth, 4, "r");
  drawColorBar(gui, barX, yG, barWidth, 4, "g");
  drawColorBar(gui, barX, yB, barWidth, 4, "b");
});