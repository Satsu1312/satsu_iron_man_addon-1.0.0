PalladiumEvents.renderPowerScreen((event) => {
  const mc = Minecraft.getInstance();
  const entity = mc.player;
  if (!entity) return;
  let height = event.screen.height / 2;
  let width = event.screen.width / 2;
  if (!event.tab || String(event.tab) !== "satsu_iron_man_addon:items/recipe_table") return;
    let size = 257;
    event.guiGraphics.blit(
      new ResourceLocation(
        `satsu_iron_man_addon:textures/gui/power/blueprint.png`
      ),
      width - 126,
      height - 100,
      0,
      0,
      size,
      size,
      size,
      size
    );
}); // Made by ShadowLegacy557