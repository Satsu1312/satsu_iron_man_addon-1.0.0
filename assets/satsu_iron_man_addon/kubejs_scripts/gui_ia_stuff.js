// Event for registering HUDs
PalladiumEvents.registerGuiOverlays((event) => {
  event.register(
    "satsu_iron_man_addon:enemies_1",
    (minecraft, gui, poseStack, partialTick, screenWidth, screenHeight) => {
      if (
        abilityUtil.isEnabled(
          minecraft.player,
          "satsu_iron_man_addon:ia_stuff/ia",
          "scan_enemies.1"
        )
      ) {
        let username = minecraft.player.getGameProfile().getName();
        let value = Utils.server.scoreboard
          .getOrCreatePlayerScore(
            username,
            Utils.server.scoreboard.getObjective("enemies")
          )
          .getScore();
        guiUtil.drawString(
          poseStack,
          Component.string("Enemies: " + value),
          300,
          20,
          0xffa500
        );
      }
    }
  );

  event.register(
    "satsu_iron_man_addon:enemies_2",
    (minecraft, gui, poseStack, partialTick, screenWidth, screenHeight) => {
      if (
        abilityUtil.isEnabled(
          minecraft.player,
          "satsu_iron_man_addon:ia_stuff/ia",
          "scan_enemies.2"
        )
      ) {
        let username = minecraft.player.getGameProfile().getName();
        let value = Utils.server.scoreboard
          .getOrCreatePlayerScore(
            username,
            Utils.server.scoreboard.getObjective("enemies")
          )
          .getScore();
        guiUtil.drawString(
          poseStack,
          Component.string("Enemies: " + value),
          300,
          20,
          0xffb6c1
        );
      }
    }
  );

  event.register(
    "satsu_iron_man_addon:enemies_3",
    (minecraft, gui, poseStack, partialTick, screenWidth, screenHeight) => {
      if (
        abilityUtil.isEnabled(
          minecraft.player,
          "satsu_iron_man_addon:ia_stuff/ia",
          "scan_enemies.3"
        )
      ) {
        let username = minecraft.player.getGameProfile().getName();
        let value = Utils.server.scoreboard
          .getOrCreatePlayerScore(
            username,
            Utils.server.scoreboard.getObjective("enemies")
          )
          .getScore();
        guiUtil.drawString(
          poseStack,
          Component.string("Enemies: " + value),
          300,
          20,
          0x9370db
        );
      }
    }
  );

  event.register(
    "satsu_iron_man_addon:enemies_4",
    (minecraft, gui, poseStack, partialTick, screenWidth, screenHeight) => {
      if (
        abilityUtil.isEnabled(
          minecraft.player,
          "satsu_iron_man_addon:ia_stuff/ia",
          "scan_enemies.4"
        )
      ) {
        let username = minecraft.player.getGameProfile().getName();
        let value = Utils.server.scoreboard
          .getOrCreatePlayerScore(
            username,
            Utils.server.scoreboard.getObjective("enemies")
          )
          .getScore();
        guiUtil.drawString(
          poseStack,
          Component.string("Enemies: " + value),
          300,
          20,
          0x708090
        );
      }
    }
  );

  event.register(
    "satsu_iron_man_addon:enemies_5",
    (minecraft, gui, poseStack, partialTick, screenWidth, screenHeight) => {
      if (
        abilityUtil.isEnabled(
          minecraft.player,
          "satsu_iron_man_addon:ia_stuff/ia",
          "scan_enemies.5"
        )
      ) {
        let username = minecraft.player.getGameProfile().getName();
        let value = Utils.server.scoreboard
          .getOrCreatePlayerScore(
            username,
            Utils.server.scoreboard.getObjective("enemies")
          )
          .getScore();
        guiUtil.drawString(
          poseStack,
          Component.string("Enemies: " + value),
          300,
          20,
          0x00bfff
        );
      }
    }
  );

  event.register(
    "satsu_iron_man_addon:enemies_6",
    (minecraft, gui, poseStack, partialTick, screenWidth, screenHeight) => {
      if (
        abilityUtil.isEnabled(
          minecraft.player,
          "satsu_iron_man_addon:ia_stuff/ia",
          "scan_enemies.6"
        )
      ) {
        let username = minecraft.player.getGameProfile().getName();
        let value = Utils.server.scoreboard
          .getOrCreatePlayerScore(
            username,
            Utils.server.scoreboard.getObjective("enemies")
          )
          .getScore();
        guiUtil.drawString(
          poseStack,
          Component.string("Enemies: " + value),
          300,
          20,
          0xffe800
        );
      }
    }
  );

  event.register(
    "satsu_iron_man_addon:enemies_7",
    (minecraft, gui, poseStack, partialTick, screenWidth, screenHeight) => {
      if (
        abilityUtil.isEnabled(
          minecraft.player,
          "satsu_iron_man_addon:ia_stuff/ia",
          "scan_enemies.7"
        )
      ) {
        let username = minecraft.player.getGameProfile().getName();
        let value = Utils.server.scoreboard
          .getOrCreatePlayerScore(
            username,
            Utils.server.scoreboard.getObjective("enemies")
          )
          .getScore();
        guiUtil.drawString(
          poseStack,
          Component.string("Enemies: " + value),
          300,
          20,
          0x09f42c
        );
      }
    }
  );

  event.register(
    "satsu_iron_man_addon:enemies_8",
    (minecraft, gui, poseStack, partialTick, screenWidth, screenHeight) => {
      if (
        abilityUtil.isEnabled(
          minecraft.player,
          "satsu_iron_man_addon:ia_stuff/ia",
          "scan_enemies.8"
        )
      ) {
        let username = minecraft.player.getGameProfile().getName();
        let value = Utils.server.scoreboard
          .getOrCreatePlayerScore(
            username,
            Utils.server.scoreboard.getObjective("enemies")
          )
          .getScore();
        guiUtil.drawString(
          poseStack,
          Component.string("Enemies: " + value),
          300,
          20,
          0x98fb98
        );
      }
    }
  );

  event.register(
    "satsu_iron_man_addon:enemies_9",
    (minecraft, gui, poseStack, partialTick, screenWidth, screenHeight) => {
      if (
        abilityUtil.isEnabled(
          minecraft.player,
          "satsu_iron_man_addon:ia_stuff/ia",
          "scan_enemies.9"
        )
      ) {
        let username = minecraft.player.getGameProfile().getName();
        let value = Utils.server.scoreboard
          .getOrCreatePlayerScore(
            username,
            Utils.server.scoreboard.getObjective("enemies")
          )
          .getScore();
        guiUtil.drawString(
          poseStack,
          Component.string("Enemies: " + value),
          300,
          20,
          0x55fb9e
        );
      }
    }
  );

  event.register(
    "satsu_iron_man_addon:enemies_10",
    (minecraft, gui, poseStack, partialTick, screenWidth, screenHeight) => {
      if (
        abilityUtil.isEnabled(
          minecraft.player,
          "satsu_iron_man_addon:ia_stuff/ia",
          "scan_enemies.10"
        )
      ) {
        let username = minecraft.player.getGameProfile().getName();
        let value = Utils.server.scoreboard
          .getOrCreatePlayerScore(
            username,
            Utils.server.scoreboard.getObjective("enemies")
          )
          .getScore();
        guiUtil.drawString(
          poseStack,
          Component.string("Enemies: " + value),
          300,
          20,
          0xfe0f0f
        );
      }
    }
  );

  event.register(
    "satsu_iron_man_addon:enemies_11",
    (minecraft, gui, poseStack, partialTick, screenWidth, screenHeight) => {
      if (
        abilityUtil.isEnabled(
          minecraft.player,
          "satsu_iron_man_addon:ia_stuff/ia",
          "scan_enemies.11"
        )
      ) {
        let username = minecraft.player.getGameProfile().getName();
        let value = Utils.server.scoreboard
          .getOrCreatePlayerScore(
            username,
            Utils.server.scoreboard.getObjective("enemies")
          )
          .getScore();
        guiUtil.drawString(
          poseStack,
          Component.string("Enemies: " + value),
          300,
          20,
          0x4682b4
        );
      }
    }
  );

  event.register(
    "satsu_iron_man_addon:enemies_12",
    (minecraft, gui, poseStack, partialTick, screenWidth, screenHeight) => {
      if (
        abilityUtil.isEnabled(
          minecraft.player,
          "satsu_iron_man_addon:ia_stuff/ia",
          "scan_enemies.12"
        )
      ) {
        let username = minecraft.player.getGameProfile().getName();
        let value = Utils.server.scoreboard
          .getOrCreatePlayerScore(
            username,
            Utils.server.scoreboard.getObjective("enemies")
          )
          .getScore();
        guiUtil.drawString(
          poseStack,
          Component.string("Enemies: " + value),
          300,
          20,
          0x0067fe
        );
      }
    }
  );
});
PalladiumEvents.registerGuiOverlays((event) => {
  event.register(
    "satsu_iron_man_addon:Satsu_ark_energy_1",
    (minecraft, gui, poseStack, partialTick, screenWidth, screenHeight) => {
      if (
        abilityUtil.isEnabled(
          minecraft.player,
          "satsu_iron_man_addon:ia_stuff/ia",
          "see.energy.unlock.lock.1"
        )
      ) {
        let username = minecraft.player.getGameProfile().getName();
        let value = Utils.server.scoreboard
          .getOrCreatePlayerScore(
            username,
            Utils.server.scoreboard.getObjective(
              "satsu.iron.man.armor.ark.energy"
            )
          )
          .getScore();
        guiUtil.drawString(
          poseStack,
          Component.string("Energy: " + value),
          10,
          5,
          0xffa500
        );
      }
    }
  );

  event.register(
    "satsu_iron_man_addon:Satsu_ark_energy_2",
    (minecraft, gui, poseStack, partialTick, screenWidth, screenHeight) => {
      if (
        abilityUtil.isEnabled(
          minecraft.player,
          "satsu_iron_man_addon:ia_stuff/ia",
          "see.energy.unlock.lock.2"
        )
      ) {
        let username = minecraft.player.getGameProfile().getName();
        let value = Utils.server.scoreboard
          .getOrCreatePlayerScore(
            username,
            Utils.server.scoreboard.getObjective(
              "satsu.iron.man.armor.ark.energy"
            )
          )
          .getScore();
        guiUtil.drawString(
          poseStack,
          Component.string("Energy: " + value),
          10,
          5,
          0xffb6c1
        );
      }
    }
  );

  event.register(
    "satsu_iron_man_addon:Satsu_ark_energy_3",
    (minecraft, gui, poseStack, partialTick, screenWidth, screenHeight) => {
      if (
        abilityUtil.isEnabled(
          minecraft.player,
          "satsu_iron_man_addon:ia_stuff/ia",
          "see.energy.unlock.lock.3"
        )
      ) {
        let username = minecraft.player.getGameProfile().getName();
        let value = Utils.server.scoreboard
          .getOrCreatePlayerScore(
            username,
            Utils.server.scoreboard.getObjective(
              "satsu.iron.man.armor.ark.energy"
            )
          )
          .getScore();
        guiUtil.drawString(
          poseStack,
          Component.string("Energy: " + value),
          10,
          5,
          0x9370db
        );
      }
    }
  );

  event.register(
    "satsu_iron_man_addon:Satsu_ark_energy_4",
    (minecraft, gui, poseStack, partialTick, screenWidth, screenHeight) => {
      if (
        abilityUtil.isEnabled(
          minecraft.player,
          "satsu_iron_man_addon:ia_stuff/ia",
          "see.energy.unlock.lock.4"
        )
      ) {
        let username = minecraft.player.getGameProfile().getName();
        let value = Utils.server.scoreboard
          .getOrCreatePlayerScore(
            username,
            Utils.server.scoreboard.getObjective(
              "satsu.iron.man.armor.ark.energy"
            )
          )
          .getScore();
        guiUtil.drawString(
          poseStack,
          Component.string("Energy: " + value),
          10,
          5,
          0x708090
        );
      }
    }
  );

  event.register(
    "satsu_iron_man_addon:Satsu_ark_energy_5",
    (minecraft, gui, poseStack, partialTick, screenWidth, screenHeight) => {
      if (
        abilityUtil.isEnabled(
          minecraft.player,
          "satsu_iron_man_addon:ia_stuff/ia",
          "see.energy.unlock.lock.5"
        )
      ) {
        let username = minecraft.player.getGameProfile().getName();
        let value = Utils.server.scoreboard
          .getOrCreatePlayerScore(
            username,
            Utils.server.scoreboard.getObjective(
              "satsu.iron.man.armor.ark.energy"
            )
          )
          .getScore();
        guiUtil.drawString(
          poseStack,
          Component.string("Energy: " + value),
          10,
          5,
          0x00bfff
        );
      }
    }
  );

  event.register(
    "satsu_iron_man_addon:Satsu_ark_energy_6",
    (minecraft, gui, poseStack, partialTick, screenWidth, screenHeight) => {
      if (
        abilityUtil.isEnabled(
          minecraft.player,
          "satsu_iron_man_addon:ia_stuff/ia",
          "see.energy.unlock.lock.6"
        )
      ) {
        let username = minecraft.player.getGameProfile().getName();
        let value = Utils.server.scoreboard
          .getOrCreatePlayerScore(
            username,
            Utils.server.scoreboard.getObjective(
              "satsu.iron.man.armor.ark.energy"
            )
          )
          .getScore();
        guiUtil.drawString(
          poseStack,
          Component.string("Energy: " + value),
          10,
          5,
          0xffe800
        );
      }
    }
  );

  event.register(
    "satsu_iron_man_addon:Satsu_ark_energy_7",
    (minecraft, gui, poseStack, partialTick, screenWidth, screenHeight) => {
      if (
        abilityUtil.isEnabled(
          minecraft.player,
          "satsu_iron_man_addon:ia_stuff/ia",
          "see.energy.unlock.lock.7"
        )
      ) {
        let username = minecraft.player.getGameProfile().getName();
        let value = Utils.server.scoreboard
          .getOrCreatePlayerScore(
            username,
            Utils.server.scoreboard.getObjective(
              "satsu.iron.man.armor.ark.energy"
            )
          )
          .getScore();
        guiUtil.drawString(
          poseStack,
          Component.string("Energy: " + value),
          10,
          5,
          0x09f42c
        );
      }
    }
  );

  event.register(
    "satsu_iron_man_addon:Satsu_ark_energy_8",
    (minecraft, gui, poseStack, partialTick, screenWidth, screenHeight) => {
      if (
        abilityUtil.isEnabled(
          minecraft.player,
          "satsu_iron_man_addon:ia_stuff/ia",
          "see.energy.unlock.lock.8"
        )
      ) {
        let username = minecraft.player.getGameProfile().getName();
        let value = Utils.server.scoreboard
          .getOrCreatePlayerScore(
            username,
            Utils.server.scoreboard.getObjective(
              "satsu.iron.man.armor.ark.energy"
            )
          )
          .getScore();
        guiUtil.drawString(
          poseStack,
          Component.string("Energy: " + value),
          10,
          5,
          0x98fb98
        );
      }
    }
  );

  event.register(
    "satsu_iron_man_addon:Satsu_ark_energy_9",
    (minecraft, gui, poseStack, partialTick, screenWidth, screenHeight) => {
      if (
        abilityUtil.isEnabled(
          minecraft.player,
          "satsu_iron_man_addon:ia_stuff/ia",
          "see.energy.unlock.lock.9"
        )
      ) {
        let username = minecraft.player.getGameProfile().getName();
        let value = Utils.server.scoreboard
          .getOrCreatePlayerScore(
            username,
            Utils.server.scoreboard.getObjective(
              "satsu.iron.man.armor.ark.energy"
            )
          )
          .getScore();
        guiUtil.drawString(
          poseStack,
          Component.string("Energy: " + value),
          10,
          5,
          0x55fb9e
        );
      }
    }
  );

  event.register(
    "satsu_iron_man_addon:Satsu_ark_energy_10",
    (minecraft, gui, poseStack, partialTick, screenWidth, screenHeight) => {
      if (
        abilityUtil.isEnabled(
          minecraft.player,
          "satsu_iron_man_addon:ia_stuff/ia",
          "see.energy.unlock.lock.10"
        )
      ) {
        let username = minecraft.player.getGameProfile().getName();
        let value = Utils.server.scoreboard
          .getOrCreatePlayerScore(
            username,
            Utils.server.scoreboard.getObjective(
              "satsu.iron.man.armor.ark.energy"
            )
          )
          .getScore();
        guiUtil.drawString(
          poseStack,
          Component.string("Energy: " + value),
          10,
          5,
          0xfe0f0f
        );
      }
    }
  );

  event.register(
    "satsu_iron_man_addon:Satsu_ark_energy_11",
    (minecraft, gui, poseStack, partialTick, screenWidth, screenHeight) => {
      if (
        abilityUtil.isEnabled(
          minecraft.player,
          "satsu_iron_man_addon:ia_stuff/ia",
          "see.energy.unlock.lock.11"
        )
      ) {
        let username = minecraft.player.getGameProfile().getName();
        let value = Utils.server.scoreboard
          .getOrCreatePlayerScore(
            username,
            Utils.server.scoreboard.getObjective(
              "satsu.iron.man.armor.ark.energy"
            )
          )
          .getScore();
        guiUtil.drawString(
          poseStack,
          Component.string("Energy: " + value),
          10,
          5,
          0x4682b4
        );
      }
    }
  );

  event.register(
    "satsu_iron_man_addon:Satsu_ark_energy_12",
    (minecraft, gui, poseStack, partialTick, screenWidth, screenHeight) => {
      if (
        abilityUtil.isEnabled(
          minecraft.player,
          "satsu_iron_man_addon:ia_stuff/ia",
          "see.energy.unlock.lock.12"
        )
      ) {
        let username = minecraft.player.getGameProfile().getName();
        let value = Utils.server.scoreboard
          .getOrCreatePlayerScore(
            username,
            Utils.server.scoreboard.getObjective(
              "satsu.iron.man.armor.ark.energy"
            )
          )
          .getScore();
        guiUtil.drawString(
          poseStack,
          Component.string("Energy: " + value),
          10,
          5,
          0x0067fe
        );
      }
    }
  );
});
