const $PalladiumKeyMappings = Java.loadClass('net.threetag.palladium.client.PalladiumKeyMappings')

let wasDown = false;

ClientEvents.tick(event => {
    if (Client.currentScreen == null) {
        const isDown = $PalladiumKeyMappings.OPEN_EQUIPMENT.isDown();
        if (isDown && !wasDown) {
            // Se acaba de presionar
            Client.player.sendData('satsu_iron_man_addon.openEquipmentKey');
        }
        wasDown = isDown;
    }
})