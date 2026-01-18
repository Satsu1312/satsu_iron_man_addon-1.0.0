function drawColorBar(gui, x, y, width, height, channel) {
  for (var i = 0; i < width; i++) {
    var t = i / (width - 1);
    var r = channel === "r" ? Math.floor(t * 255) : 0;
    var g = channel === "g" ? Math.floor(t * 255) : 0;
    var b = channel === "b" ? Math.floor(t * 255) : 0;
    var col = (255 << 24) | (r << 16) | (g << 8) | b;
    gui.fill(x + i, y, x + i + 1, y + height, col);
  }
}
let Minecraft = Java.loadClass("net.minecraft.client.Minecraft");
const RenderSystem = Java.loadClass("com.mojang.blaze3d.systems.RenderSystem");
PalladiumEvents.renderPowerScreen((event) => {
  let entity = Minecraft.getInstance().player;
  if (!entity) return;
  let height = event.screen.height / 2;
  let width = event.screen.width / 2;
  if (
    event.tab
      .toString()
      .includes("satsu_iron_man_addon:iron_man/marks/mark_86/main")
  ) {
    let size = 257;
    event.guiGraphics.blit(
      new ResourceLocation(`satsu_iron_man_addon:textures/gui/power/hud.png`),
      width - 126,
      height - 100,
      0,
      0,
      size,
      size,
      size,
      size,
    );
  }
}); // Made by ShadowLegacy557
