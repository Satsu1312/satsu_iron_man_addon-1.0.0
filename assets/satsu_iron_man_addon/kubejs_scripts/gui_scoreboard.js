// Event for registering HUDs
PalladiumEvents.registerGuiOverlays((event) => {
  event.register(
    // ID for the overlay
    "satsu_iron_man_addon:enemies",
    // Function for rendering
    (minecraft, gui, poseStack, partialTick, screenWidth, screenHeight) => {
      if (abilityUtil.isEnabled(minecraft.player, "satsu_iron_man_addon:armor/iron_man_armor", "scan_enemies")) {
        let username = minecraft.player.getGameProfile().getName();
        let value = Utils.server.scoreboard
          .getOrCreatePlayerScore(
            username,
            Utils.server.scoreboard.getObjective("enemies")
          )
          .getScore();

        // Drawing text. Parameters: PoseStack, Text (as text component), X, Y, Color
        guiUtil.drawString(
          poseStack,
          Component.string("Enemies: " + value),
          300,
          20,
          0x5909ff
        );
      }
    }
  );
});
PalladiumEvents.registerGuiOverlays((event) => {
  event.register(
    // ID for the overlay
    "m_ten:Omnitrix xp",
    // Function for rendering
    (minecraft, gui, poseStack, partialTick, screenWidth, screenHeight) => {
      if (abilityUtil.hasPower(minecraft.player, "omnitrix_things:omni_exp_gui")) {
        let username = minecraft.player.getGameProfile().getName();
        let value = Utils.server.scoreboard
          .getOrCreatePlayerScore(
            username,
            Utils.server.scoreboard.getObjective("OmniExp")
          )
          .getScore();

        // Drawing text. Parameters: PoseStack, Text (as text component), X, Y, Color
        guiUtil.drawString(
          poseStack,
          Component.string("Omnitrix xp: " + value),
          10,
          10,
          0x0af755
        );
      }
    }
  );
});