const $PalladiumKeyMappings = Java.loadClass('net.threetag.palladium.client.PalladiumKeyMappings');

ClientEvents.tick(event => {
    if (Client.currentScreen == null) {
        const key = $PalladiumKeyMappings.OPEN_EQUIPMENT;
        if (key.consumeClick()) {
            // consumeClick devuelve true solo cuando se presiona (no cuando se mantiene)
            Client.player.sendData('satsu_iron_man_addon.openEquipmentKey');
        }
    }
});