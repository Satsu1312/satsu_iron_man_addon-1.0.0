// Event for registering HUDs
function positions(player_position, position) {
  const pos_text = Component.translate("satsu.iron.man.addon.text." + position)
  player_position = Math.trunc(player_position)
  return Component.join("", pos_text, player_position);
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
function show_label(player, property_name, property_value){
  let text_property = Component.translate("satsu.iron.man.addon.text." + property_name);
  let value = palladium.getProperty(player, property_value);

  if (property_name == "energy_on_hud") {
    const percentage = Component.translate("satsu.iron.man.addon.text.percentage");
    const max_value = palladium.getProperty(player, property_value + "_max");
    value = Math.trunc((value / max_value) * 100);
    value = Component.join("", value, percentage);
  }

  return Component.join("", text_property, value);
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
          show_label(player, "energy_on_hud", "satsu_iron_man_armor_arc_energy"),
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
          show_label(player, "velocity_on_hud", "satsu_iron_man_flight_speed_choose"),
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
});const InventoryScreen = Java.loadClass(
  "net.minecraft.client.gui.screens.inventory.InventoryScreen"
);
const Quaternionf = Java.loadClass("org.joml.Quaternionf");

PalladiumEvents.registerGuiOverlays((event) => {
  event.register(
    "satsu_iron_man_addon/armor_principal/iron_man_armor_test",
    (
      minecraftClient,
      gui,
      poseStack,
      partialTick,
      screenWidth,
      screenHeight
    ) => {
      if (
        abilityUtil.isEnabled(
          minecraftClient.player,
          "satsu_iron_man_addon:ia_stuff/ia",
          "see.energy.unlock.lock.1"
        )
      ){
        let yaw =
          (-(
            (
              minecraftClient.player.yBodyRot + 20
            ) /*'20' is the yaw offset, in degrees; it looks better facing slightly off to the side than straight on*/
          ) *
            JavaMath.PI) /
          180;
        // arguments: (poseStack, x, y, size, quaternion for the rotation, another quaternion (i don't know what it does so i left it null), entity)
        InventoryScreen.renderEntityInInventory(
          poseStack,
          60,
          170,
          30,
          new Quaternionf(Math.cos(0.5 * yaw), 0, -Math.sin(0.5 * yaw), 0),
          null,
          minecraftClient.player
        );
      }
    }
  );
});

PalladiumEvents.registerGuiOverlays((event) => {
  event.register(
    "satsu_iron_man_addon:ia_name",
    (minecraft, gui, poseStack, partialTick, screenWidth, screenHeight) => {
      const player = minecraft.player;
      if (
        abilityUtil.isEnabled(
          player,
          "satsu_iron_man_addon:ia_stuff/ia",
          "see.energy.unlock.lock.1"
        )
      ) {
        guiUtil.drawString(
          poseStack,
          show_label(player, "ia_name", "satsu_iron_man_ia_name"),
          540,
          45,
          ia_color(player)
        );
      }
    }
  );
});
