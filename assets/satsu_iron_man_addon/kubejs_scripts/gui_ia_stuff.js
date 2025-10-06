// Event for registering HUDs
function energy_label(player) {
  const energy_text = Component.translate("satsu.iron.man.addon.text.energy_on_hud");
  const energy_value = palladium.getProperty(player, "satsu_iron_man_armor_arc_energy");
  return Component.join("", energy_text, energy_value);
}
function velocity_label(player) {
  const velocity_text = Component.translate("satsu.iron.man.addon.text.velocity_on_hud");
  const velocity_value = palladium.getProperty(player, "satsu_iron_man_flight_speed_choose");
  return Component.join("", velocity_text, velocity_value);
}
function ia_color(player) {
  const color = palladium.getProperty(player, "satsu_iron_man_ia_color");
  return parseInt(color, 16);
}

PalladiumEvents.registerGuiOverlays((event) => {
  event.register(
    "satsu_iron_man_addon:Satsu_ark_energy_1",
    (minecraft, gui, poseStack, partialTick, screenWidth, screenHeight) => {
      const player = minecraft.player
      if (
        abilityUtil.isEnabled(
          player,
          "satsu_iron_man_addon:ia_stuff/ia",
          "see.energy.unlock.lock.1"
        )
      ) {
        guiUtil.drawString(
          poseStack,
          energy_label(player),
          30,
          30,
          ia_color(player)
        );
      }
    }
  );
});
PalladiumEvents.registerGuiOverlays((event) => {
  event.register(
    "satsu_iron_man_addon:speed_1",
    (minecraft, gui, poseStack, partialTick, screenWidth, screenHeight) => {
      const player = minecraft.player
      if (
        abilityUtil.isEnabled(
          player,
          "satsu_iron_man_addon:ia_stuff/ia",
          "see.energy.unlock.lock.1"
        )
      ) {
        guiUtil.drawString(
          poseStack,
          velocity_label(player),
          30,
          40,
          ia_color(player)
        );
      }
    }
  );
});
