// Event for registering HUDs
function energy_label(minecraft) {
  let username = minecraft.player;
  const energy_text = Component.translate("satsu.iron.man.addon.text.energy_on_hud");
  const energy_value = palladium.getProperty(username, "satsu_iron_man_armor_arc_energy");
  return Component.join("", energy_text, energy_value);
}
function velocity_label(minecraft) {
  let username = minecraft.player;
  const velocity_text = Component.translate("satsu.iron.man.addon.text.velocity_on_hud");
  const velocity_value = palladium.getProperty(username, "satsu_iron_man_flight_speed_choose");
  return Component.join("", velocity_text, velocity_value);
}

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
        guiUtil.drawString(
          poseStack,
          energy_label(minecraft),
          8,
          20,
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
        guiUtil.drawString(
          poseStack,
          energy_label(minecraft),
          8,
          20,
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
        guiUtil.drawString(
          poseStack,
          energy_label(minecraft),
          8,
          20,
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
        guiUtil.drawString(
          poseStack,
          energy_label(minecraft),
          8,
          20,
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
        guiUtil.drawString(
          poseStack,
          energy_label(minecraft),
          8,
          20,
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
        guiUtil.drawString(
          poseStack,
          energy_label(minecraft),
          8,
          20,
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
        guiUtil.drawString(
          poseStack,
          energy_label(minecraft),
          8,
          20,
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
        guiUtil.drawString(
          poseStack,
          energy_label(minecraft),
          8,
          20,
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
        guiUtil.drawString(
          poseStack,
          energy_label(minecraft),
          8,
          20,
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
        guiUtil.drawString(
          poseStack,
          energy_label(minecraft),
          8,
          20,
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
        guiUtil.drawString(
          poseStack,
          energy_label(minecraft),
          8,
          20,
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
        guiUtil.drawString(
          poseStack,
          energy_label(minecraft),
          8,
          20,
          0x0067fe
        );
      }
    }
  );
});
PalladiumEvents.registerGuiOverlays((event) => {
  event.register(
    "satsu_iron_man_addon:speed_1",
    (minecraft, gui, poseStack, partialTick, screenWidth, screenHeight) => {
      if (
        abilityUtil.isEnabled(
          minecraft.player,
          "satsu_iron_man_addon:ia_stuff/ia",
          "see.energy.unlock.lock.1"
        )
      ) {
        guiUtil.drawString(
          poseStack,
          velocity_label(minecraft),
          8,
          30,
          0xffa500
        );
      }
    }
  );

  event.register(
    "satsu_iron_man_addon:speed_2",
    (minecraft, gui, poseStack, partialTick, screenWidth, screenHeight) => {
      if (
        abilityUtil.isEnabled(
          minecraft.player,
          "satsu_iron_man_addon:ia_stuff/ia",
          "see.energy.unlock.lock.2"
        )
      ) {
        guiUtil.drawString(
          poseStack,
          velocity_label(minecraft),
          8,
          30,
          0xffb6c1
        );
      }
    }
  );

  event.register(
    "satsu_iron_man_addon:speed_3",
    (minecraft, gui, poseStack, partialTick, screenWidth, screenHeight) => {
      if (
        abilityUtil.isEnabled(
          minecraft.player,
          "satsu_iron_man_addon:ia_stuff/ia",
          "see.energy.unlock.lock.3"
        )
      ) {
        guiUtil.drawString(
          poseStack,
          velocity_label(minecraft),
          8,
          30,
          0x9370db
        );
      }
    }
  );

  event.register(
    "satsu_iron_man_addon:speed_4",
    (minecraft, gui, poseStack, partialTick, screenWidth, screenHeight) => {
      if (
        abilityUtil.isEnabled(
          minecraft.player,
          "satsu_iron_man_addon:ia_stuff/ia",
          "see.energy.unlock.lock.4"
        )
      ) {
        guiUtil.drawString(
          poseStack,
          velocity_label(minecraft),
          8,
          30,
          0x708090
        );
      }
    }
  );

  event.register(
    "satsu_iron_man_addon:speed_5",
    (minecraft, gui, poseStack, partialTick, screenWidth, screenHeight) => {
      if (
        abilityUtil.isEnabled(
          minecraft.player,
          "satsu_iron_man_addon:ia_stuff/ia",
          "see.energy.unlock.lock.5"
        )
      ) {
        guiUtil.drawString(
          poseStack,
          velocity_label(minecraft),
          8,
          30,
          0x00bfff
        );
      }
    }
  );

  event.register(
    "satsu_iron_man_addon:speed_6",
    (minecraft, gui, poseStack, partialTick, screenWidth, screenHeight) => {
      if (
        abilityUtil.isEnabled(
          minecraft.player,
          "satsu_iron_man_addon:ia_stuff/ia",
          "see.energy.unlock.lock.6"
        )
      ) {
        guiUtil.drawString(
          poseStack,
          velocity_label(minecraft),
          8,
          30,
          0xffe800
        );
      }
    }
  );

  event.register(
    "satsu_iron_man_addon:speed_7",
    (minecraft, gui, poseStack, partialTick, screenWidth, screenHeight) => {
      if (
        abilityUtil.isEnabled(
          minecraft.player,
          "satsu_iron_man_addon:ia_stuff/ia",
          "see.energy.unlock.lock.7"
        )
      ) {
        guiUtil.drawString(
          poseStack,
          velocity_label(minecraft),
          8,
          30,
          0x09f42c
        );
      }
    }
  );

  event.register(
    "satsu_iron_man_addon:speed_8",
    (minecraft, gui, poseStack, partialTick, screenWidth, screenHeight) => {
      if (
        abilityUtil.isEnabled(
          minecraft.player,
          "satsu_iron_man_addon:ia_stuff/ia",
          "see.energy.unlock.lock.8"
        )
      ) {
        guiUtil.drawString(
          poseStack,
          velocity_label(minecraft),
          8,
          30,
          0x98fb98
        );
      }
    }
  );

  event.register(
    "satsu_iron_man_addon:speed_9",
    (minecraft, gui, poseStack, partialTick, screenWidth, screenHeight) => {
      if (
        abilityUtil.isEnabled(
          minecraft.player,
          "satsu_iron_man_addon:ia_stuff/ia",
          "see.energy.unlock.lock.9"
        )
      ) {
        guiUtil.drawString(
          poseStack,
          velocity_label(minecraft),
          8,
          30,
          0x55fb9e
        );
      }
    }
  );

  event.register(
    "satsu_iron_man_addon:speed_10",
    (minecraft, gui, poseStack, partialTick, screenWidth, screenHeight) => {
      if (
        abilityUtil.isEnabled(
          minecraft.player,
          "satsu_iron_man_addon:ia_stuff/ia",
          "see.energy.unlock.lock.10"
        )
      ) {
        guiUtil.drawString(
          poseStack,
          velocity_label(minecraft),
          8,
          30,
          0xfe0f0f
        );
      }
    }
  );

  event.register(
    "satsu_iron_man_addon:speed_11",
    (minecraft, gui, poseStack, partialTick, screenWidth, screenHeight) => {
      if (
        abilityUtil.isEnabled(
          minecraft.player,
          "satsu_iron_man_addon:ia_stuff/ia",
          "see.energy.unlock.lock.11"
        )
      ) {
        guiUtil.drawString(
          poseStack,
          velocity_label(minecraft),
          8,
          30,
          0x4682b4
        );
      }
    }
  );

  event.register(
    "satsu_iron_man_addon:speed_12",
    (minecraft, gui, poseStack, partialTick, screenWidth, screenHeight) => {
      if (
        abilityUtil.isEnabled(
          minecraft.player,
          "satsu_iron_man_addon:ia_stuff/ia",
          "see.energy.unlock.lock.12"
        )
      ) {
        guiUtil.drawString(
          poseStack,
          velocity_label(minecraft),
          8,
          30,
          0x0067fe
        );
      }
    }
  );
});
