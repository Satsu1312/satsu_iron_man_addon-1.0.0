// 1. Declaramos la clase solo una vez al principio del archivo
const $Satsu_iron_man_addonKeyMappings = Java.loadClass(
  "dev.architectury.registry.client.keymappings.KeyMappingRegistry",
);

// 2. Unificamos todo en un solo evento de Tick
ClientEvents.tick((event) => {
  // Verificamos una sola vez si el jugador no tiene un menú abierto
  if (Client.currentScreen == null) {
    // Lógica para el ESCUDO
    if (global["SHIELD_ENABLING"] && global["SHIELD_ENABLING"].consumeClick()) {
      Client.player.sendData("satsu_iron_man_addon.shieldenablingkey");
    }

    // Lógica para el SISTEMA DE ARMAS
    if (global["WEAPONS_SYSTEM"] && global["WEAPONS_SYSTEM"].consumeClick()) {
      Client.player.sendData("satsu_iron_man_addon.weaponsSystemKey");
    }
  }
});
