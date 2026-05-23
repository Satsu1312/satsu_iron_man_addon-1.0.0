// 1. Declaramos la clase solo una vez al principio del archivo
const $Satsu_iron_man_addonKeyMappings = Java.loadClass(
  "dev.architectury.registry.client.keymappings.KeyMappingRegistry",
);

// Variables para rastrear el estado anterior (evita spam de paquetes)
let modularWasDown = false;

ClientEvents.tick((event) => {
  // Verificamos una sola vez si el jugador no tiene un menú abierto
  if (Client.currentScreen == null) {
    // --- Lógica para el MODULAR (SISTEMA HELD) ---
    if (global["modular_key"]) {
      let modularIsDown = global["modular_key"].isDown();

      // Solo enviamos datos si el estado cambió (de presionado a soltado o viceversa)
      if (modularIsDown !== modularWasDown) {
        Client.player.sendData("satsu_iron_man_addon.modularkey", {
          pressed: modularIsDown,
        });
        modularWasDown = modularIsDown;
      }
    }

    // --- Lógica para el ESCUDO (Sigue siendo Toggle/Click) ---
    if (global["SHIELD_ENABLING"] && global["SHIELD_ENABLING"].consumeClick()) {
      Client.player.sendData("satsu_iron_man_addon.shieldenablingkey");
    }

    // --- Lógica para el SISTEMA DE ARMAS (Sigue siendo Toggle/Click) ---
    if (global["WEAPONS_SYSTEM"] && global["WEAPONS_SYSTEM"].consumeClick()) {
      Client.player.sendData("satsu_iron_man_addon.weaponsSystemKey");
    }

    // --- Lógica para el REFRESH HEAT (Sigue siendo Toggle/Click) ---
    if (global["REFRESH_HEAT"] && global["REFRESH_HEAT"].consumeClick()) {
      Client.player.sendData("satsu_iron_man_addon.refresh_heat");
    }
  } else {
    // Si abres un menú mientras mantienes la tecla, forzamos que se "suelte"
    // para evitar que el efecto se quede trabado en el servidor.
    if (modularWasDown) {
      Client.player.sendData("satsu_iron_man_addon.modularkey", {
        pressed: false,
      });
      modularWasDown = false;
    }
  }
});
