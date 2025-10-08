// Event for registering HUDs
function energy_label(player) {
  const energy_text = Component.translate("satsu.iron.man.addon.text.energy_on_hud");
  let energy_value = palladium.getProperty(player, "satsu_iron_man_armor_arc_energy");
  return Component.join("", energy_text, energy_value);
}
function positions(player_position, position) {
  const pos_text = Component.translate("satsu.iron.man.addon.text." + position)
  player_position = Math.trunc(player_position)
  return Component.join("", pos_text, player_position);
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
function armor_durability(player) {
  const armor_text = Component.translate("satsu.iron.man.addon.text.armor_durablity");
  const slash = Component.translate("satsu.iron.man.addon.text.slash");
  const slot = player.getInventory().getArmor(2);
  const maxDurability = slot.maxDamage;
  const currentDamage = slot.damageValue;
  const durabilityLeft = maxDurability - currentDamage;
  return Component.join("",armor_text, maxDurability, slash, durabilityLeft);
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
          50,
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
          50,
          40,
          ia_color(player)
        );
      }
    }
  );
});
PalladiumEvents.registerGuiOverlays((event) => {
  event.register(
    "satsu_iron_man_addon:get_x",
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
          positions(player.getX(), "X"),
          60,
          70,
          ia_color(player)
        );
      }
    }
  );
});
PalladiumEvents.registerGuiOverlays((event) => {
  event.register(
    "satsu_iron_man_addon:get_Y",
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
          positions(player.getY(), "Y"),
          60,
          80,
          ia_color(player)
        );
      }
    }
  );
});
PalladiumEvents.registerGuiOverlays((event) => {
  event.register(
    "satsu_iron_man_addon:get_Z",
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
          positions(player.getZ(), "Z"),
          60,
          90,
          ia_color(player)
        );
      }
    }
  );
});
PalladiumEvents.registerGuiOverlays((event) => {
  event.register(
    "satsu_iron_man_addon:get_armor",
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
          armor_durability(player),
          550,
          30,
          ia_color(player)
        );
      }
    }
  );
});
