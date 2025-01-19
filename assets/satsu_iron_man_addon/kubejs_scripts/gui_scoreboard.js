// Event for registering HUDs
PalladiumEvents.registerGuiOverlays((event) => {
  event.register(
    // ID for the overlay
    "satsu_iron_man_addon:enemies",
    // Function for rendering
    (minecraft, gui, poseStack, partialTick, screenWidth, screenHeight) => {
      if (
        abilityUtil.isEnabled(
          minecraft.player,
          "satsu_iron_man_addon:ia_stuff/ia",
          "scan_enemies"
        )
      ) {
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
    "satsu_iron_man_addon:SatsuIronManArmorSkillPoint",
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
            Utils.server.scoreboard.getObjective("SatsuIronManArmorSkillPoint")
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
    "satsu_iron_man_addon:SatsuIronManArmorExp",
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
            Utils.server.scoreboard.getObjective("SatsuIronManArmorExp")
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
PalladiumEvents.registerGuiOverlays((event) => {
  event.register(
    // ID for the overlay
    "satsu_iron_man_addon:Satsu_ark_energy",
    // Function for rendering
    (minecraft, gui, poseStack, partialTick, screenWidth, screenHeight) => {
      if (
        abilityUtil.isEnabled(
          minecraft.player,
          "satsu_iron_man_addon:ia_stuff/ia",
          "see.energy.unlock.lock"
        )
      ) {
        let username = minecraft.player.getGameProfile().getName();
        let value = Utils.server.scoreboard
          .getOrCreatePlayerScore(
            username,
            Utils.server.scoreboard.getObjective("satsu.iron.man.armor.ark.energy")
          )
          .getScore();

        // Drawing text. Parameters: PoseStack, Text (as text component), X, Y, Color
        guiUtil.drawString(
          poseStack,
          Component.string("Energy: " + value),
          40,
          180,
          0x160cff
        );
      }
    }
  );
});
