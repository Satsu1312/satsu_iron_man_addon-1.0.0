(function() {
  // Función de traducción rápida
  const t = (key) => Component.translate("satsu.iron.man.addon.text." + key);

  // Funciones auxiliares
  const positions = (playerPos, axis) =>
    Component.join("", t(axis), Math.trunc(playerPos));

  const ia_color = (player) =>
    parseInt(palladium.getProperty(player, "satsu_iron_man_ia_color"), 16);

  const armor_durability = (player) => {
    // 1. Cargamos la API de Curios
    const CuriosApi = Java.loadClass('top.theillusivec4.curios.api.CuriosApi');
    let slotItem = Item.empty;

    // 2. Buscamos el contenedor de Curios en el jugador de forma segura
    CuriosApi.getCuriosHelper().getCuriosHandler(player).ifPresent(handler => {
      let stacksHandler = handler.getStacksHandler("tecnology_armor");
      if (stacksHandler.isPresent()) {
        let curioStacks = stacksHandler.get().getStacks();
        // Obtenemos el ítem del slot 0 envuelto para KubeJS
        slotItem = Item.of(curioStacks.getStackInSlot(0));
      }
    });

    // 3. Si el slot está vacío, devolvemos 0/0
    if (slotItem.isEmpty()) {
      return Component.join("", t("armor_durablity"), t("slash"), "0/0");
    }

    // 4. Calculamos la durabilidad con las propiedades nativas de KubeJS
    const max = slotItem.maxDamage;
    const left = max - slotItem.damageValue;
    return Component.join("", t("armor_durablity"), max, t("slash"), left);
  };

  const show_label = (player, propName, propValue) => {
    let value = palladium.getProperty(player, propValue);
    if (["energy_on_hud", "energy_on_hud_iron_heart", "nanites_on_hud"].includes(propName)) {
      const maxVal = palladium.getProperty(player, propValue + "_max");
      value = Component.join("", Math.trunc((value / maxVal) * 100), t("percentage"));
    }
    return Component.join("", t(propName), value);
  };

  const speed_per_block = () =>
    Component.join("", t("km"), Client.player.persistentData["speedBPS"]);

  // Función genérica para registrar overlays
  const registerOverlay = (event, id, abilityId, abilityKey, labelFn, x, y) => {
    event.register(id, (mc, gui, poseStack) => {
      const player = mc.player;
      if (abilityUtil.isEnabled(player, abilityId, abilityKey)) {
        guiUtil.drawString(poseStack, labelFn(player), x, y, ia_color(player));
      }
    });
  };

  // Declaración de overlays en un arreglo
  const overlays = [
    ["im_wm_energy", "see.energy.im_wm", (p) => show_label(p, "energy_on_hud", "satsu_iron_man_iron_man_energy"), 50, 30],
    ["iron_heart_energy", "see.energy.ih", (p) => show_label(p, "energy_on_hud_iron_heart", "satsu_iron_man_iron_heart_energy"), 50, 30],
    ["nanite", "nanites_count", (p) => show_label(p, "nanites_on_hud", "satsu_iron_man_nano_counts"), 50, 200],
    ["speed_1", "armor_on_body", (p) => show_label(p, "velocity_on_hud", "satsu_iron_man_flight_speed_choose"), 50, 40],
    ["left_arm", "armor_on_body", (p) => show_label(p, "left_or_not", "satsu_left_arm"), 540, 60],
    ["break_blocks", "armor_on_body", (p) => show_label(p, "break_block", "satsu_iron_man_addon_break_block_attack"), 540, 80],
    ["weapons_system", "armor_on_body", (p) => show_label(p, "weapon_system", "satsu_armor_weapon_system"), 60, 100],
    ["get_x", "see.energy.unlock.lock.1", (p) => positions(p.getX(), "X"), 60, 70],
    ["get_Y", "see.energy.unlock.lock.1", (p) => positions(p.getY(), "Y"), 60, 80],
    ["get_Z", "see.energy.unlock.lock.1", (p) => positions(p.getZ(), "Z"), 60, 90],
    ["km", "horizon_lock", () => speed_per_block(), 400, 180],
    ["night_vision", "see.energy.unlock.lock.1", (p) => show_label(p, "night_vision", "satsu_iron_man_addon_enable_night_vision"), 60, 250],
    ["scan", "see.energy.unlock.lock.1", (p) => show_label(p, "scan", "satsu_iron_man_addon_enable_scan"), 60, 260],
    ["get_armor", "armor_on_body", (p) => armor_durability(p), 550, 30],
    ["ia_name", "see.energy.unlock.lock.1", (p) => show_label(p, "ia_name", "satsu_iron_man_ia_name"), 540, 45],
  ];

  PalladiumEvents.registerGuiOverlays((event) => {
    overlays.forEach(([id, abilityKey, fn, x, y]) =>
      registerOverlay(event, "satsu_iron_man_addon:" + id, "satsu_iron_man_addon:ia_stuff/ia", abilityKey, fn, x, y)
    );
  });

  // Render del jugador en inventario
  PalladiumEvents.registerGuiOverlays((event) => {
    const InventoryScreen = Java.loadClass("net.minecraft.client.gui.screens.inventory.InventoryScreen");
    const Quaternionf = Java.loadClass("org.joml.Quaternionf");

    event.register("satsu_iron_man_addon/armor_principal/iron_man_armor_test",
      (mc, gui, poseStack) => {
        const player = mc.player;
        if (abilityUtil.isEnabled(player, "satsu_iron_man_addon:ia_stuff/ia", "see.energy.unlock.lock.1")) {
          const yaw = (-(player.yBodyRot + 20) * JavaMath.PI) / 180;
          InventoryScreen.renderEntityInInventory(
            poseStack, 60, 170, 30,
            new Quaternionf(Math.cos(0.5 * yaw), 0, -Math.sin(0.5 * yaw), 0),
            null,
            player
          );
        }
      });
  });
})();