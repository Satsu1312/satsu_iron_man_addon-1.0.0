(function() {
  // Funciones auxiliares
  function positions(player_position, position) {
    const pos_text = Component.translate("satsu.iron.man.addon.text." + position);
    return Component.join("", pos_text, Math.trunc(player_position));
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
    return Component.join("", armor_text, maxDurability, slash, durabilityLeft);
  }

  function show_label(player, property_name, property_value) {
    let text_property = Component.translate("satsu.iron.man.addon.text." + property_name);
    let value = palladium.getProperty(player, property_value);

    const percentageProps = [
      "energy_on_hud",
      "energy_on_hud_iron_heart",
      "nanites_on_hud"
    ];

    if (percentageProps.includes(property_name)) {
      const percentage = Component.translate("satsu.iron.man.addon.text.percentage");
      const max_value = palladium.getProperty(player, property_value + "_max");
      value = Component.join("", Math.trunc((value / max_value) * 100), percentage);
    }

    return Component.join("", text_property, value);
  }

  function speed_per_block() {
    const text = Component.translate("satsu.iron.man.addon.text.km");
    const speed = Client.player.persistentData['speedBPS'];
    return Component.join("", text, speed);
  }

  // Función genérica para registrar overlays
  function registerOverlay(event, id, abilityId, abilityKey, labelFn, x, y) {
    event.register(id, (minecraft, gui, poseStack) => {
      const player = minecraft.player;
      if (abilityUtil.isEnabled(player, abilityId, abilityKey)) {
        guiUtil.drawString(poseStack, labelFn(player), x, y, ia_color(player));
      }
    });
  }

  PalladiumEvents.registerGuiOverlays((event) => {
    // overlays anteriores...
    registerOverlay(event, "satsu_iron_man_addon:im_wm_energy", "satsu_iron_man_addon:ia_stuff/ia", "see.energy.im_wm",
      (p) => show_label(p, "energy_on_hud", "satsu_iron_man_iron_man_energy"), 50, 30);

    registerOverlay(event, "satsu_iron_man_addon:iron_heart_energy", "satsu_iron_man_addon:ia_stuff/ia", "see.energy.ih",
      (p) => show_label(p, "energy_on_hud_iron_heart", "satsu_iron_man_iron_heart_energy"), 50, 30);

    registerOverlay(event, "satsu_iron_man_addon:nanite", "satsu_iron_man_addon:ia_stuff/ia", "nanites_count",
      (p) => show_label(p, "nanites_on_hud", "satsu_iron_man_nano_counts"), 50, 200);

    registerOverlay(event, "satsu_iron_man_addon:speed_1", "satsu_iron_man_addon:ia_stuff/ia", "armor_on_body",
      (p) => show_label(p, "velocity_on_hud", "satsu_iron_man_flight_speed_choose"), 50, 40);

    registerOverlay(event, "satsu_iron_man_addon:left_arm", "satsu_iron_man_addon:ia_stuff/ia", "armor_on_body",
      (p) => show_label(p, "left_or_not", "satsu_left_arm"), 540, 60);

    registerOverlay(event, "satsu_iron_man_addon:break_blocks", "satsu_iron_man_addon:ia_stuff/ia", "armor_on_body",
      (p) => show_label(p, "break_block", "satsu_iron_man_addon_break_block_attack"), 540, 80);

    registerOverlay(event, "satsu_iron_man_addon:weapons_system", "satsu_iron_man_addon:ia_stuff/ia", "armor_on_body",
      (p) => show_label(p, "weapon_system", "satsu_armor_weapon_system"), 60, 100);

    registerOverlay(event, "satsu_iron_man_addon:get_x", "satsu_iron_man_addon:ia_stuff/ia", "see.energy.unlock.lock.1",
      (p) => positions(p.getX(), "X"), 60, 70);

    registerOverlay(event, "satsu_iron_man_addon:get_Y", "satsu_iron_man_addon:ia_stuff/ia", "see.energy.unlock.lock.1",
      (p) => positions(p.getY(), "Y"), 60, 80);

    registerOverlay(event, "satsu_iron_man_addon:get_Z", "satsu_iron_man_addon:ia_stuff/ia", "see.energy.unlock.lock.1",
      (p) => positions(p.getZ(), "Z"), 60, 90);

    // nuevos overlays integrados
    registerOverlay(event, "satsu_iron_man_addon:km", "satsu_iron_man_addon:ia_stuff/ia", "horizon_lock",
      () => speed_per_block(), 400, 180);

    registerOverlay(event, "satsu_iron_man_addon:night_vision", "satsu_iron_man_addon:ia_stuff/ia", "see.energy.unlock.lock.1",
      (p) => show_label(p, "night_vision", "satsu_iron_man_addon_enable_night_vision"), 60, 250);

    registerOverlay(event, "satsu_iron_man_addon:scan", "satsu_iron_man_addon:ia_stuff/ia", "see.energy.unlock.lock.1",
      (p) => show_label(p, "scan", "satsu_iron_man_addon_enable_scan"), 60, 260);

    registerOverlay(event, "satsu_iron_man_addon:get_armor", "satsu_iron_man_addon:ia_stuff/ia", "armor_on_body",
      (p) => armor_durability(p), 550, 30);

    registerOverlay(event, "satsu_iron_man_addon:ia_name", "satsu_iron_man_addon:ia_stuff/ia", "see.energy.unlock.lock.1",
      (p) => show_label(p, "ia_name", "satsu_iron_man_ia_name"), 540, 45);
  });

  // Render del jugador en inventario
  PalladiumEvents.registerGuiOverlays((event) => {
    const InventoryScreen = Java.loadClass("net.minecraft.client.gui.screens.inventory.InventoryScreen");
    const Quaternionf = Java.loadClass("org.joml.Quaternionf");

    event.register("satsu_iron_man_addon/armor_principal/iron_man_armor_test",
      (minecraftClient, gui, poseStack) => {
        if (abilityUtil.isEnabled(minecraftClient.player, "satsu_iron_man_addon:ia_stuff/ia", "see.energy.unlock.lock.1")) {
          const yaw = (-(minecraftClient.player.yBodyRot + 20) * JavaMath.PI) / 180;
          InventoryScreen.renderEntityInInventory(
            poseStack, 60, 170, 30,
            new Quaternionf(Math.cos(0.5 * yaw), 0, -Math.sin(0.5 * yaw), 0),
            null,
            minecraftClient.player
          );
        }
      });
  });
})();