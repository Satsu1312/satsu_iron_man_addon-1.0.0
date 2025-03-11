// Event for registering HUDs
PalladiumEvents.registerGuiOverlays((event) => {
  event.register(
    // ID for the overlay
    "satsu_iron_man_addon:satsu.iron.man.addon.skill.point",
    // Function for rendering
    (minecraft, gui, poseStack, partialTick, screenWidth, screenHeight) => {
      if (
        abilityUtil.isEnabled(
          minecraft.player,
          "satsu_iron_man_addon:armor_principal/iron_man_xp",
          "see.points"
        )
      ) {
        let username = minecraft.player.getGameProfile().getName();
        let value = Utils.server.scoreboard
          .getOrCreatePlayerScore(
            username,
            Utils.server.scoreboard.getObjective("satsu.iron.man.addon.skill.point")
          )
          .getScore();

        // Drawing text. Parameters: PoseStack, Text (as text component), X, Y, Color
        guiUtil.drawString(
          poseStack,
          Component.string("Armor Skill Point: " + value),
          10,
          20,
          0x160cff
        );
      }
    }
  );
});
PalladiumEvents.registerGuiOverlays((event) => {
  event.register(
    // ID for the overlay
    "satsu_iron_man_addon:satsu.iron.man.addon.xp",
    // Function for rendering
    (minecraft, gui, poseStack, partialTick, screenWidth, screenHeight) => {
      if (
        abilityUtil.isEnabled(
          minecraft.player,
          "satsu_iron_man_addon:armor_principal/iron_man_xp",
          "see.points"
        )
      ) {
        let username = minecraft.player.getGameProfile().getName();
        let value = Utils.server.scoreboard
          .getOrCreatePlayerScore(
            username,
            Utils.server.scoreboard.getObjective("satsu.iron.man.addon.xp")
          )
          .getScore();

        // Drawing text. Parameters: PoseStack, Text (as text component), X, Y, Color
        guiUtil.drawString(
          poseStack,
          Component.string("Armor xp: " + value),
          10,
          10,
          0x160cff
        );
      }
    }
  );
});
