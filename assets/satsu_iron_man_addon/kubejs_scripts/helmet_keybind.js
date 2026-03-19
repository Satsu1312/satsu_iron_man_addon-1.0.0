const $PalladiumKeyMappings = Java.loadClass('net.threetag.palladium.client.PalladiumKeyMappings')

ClientEvents.tick(event => {
    if (Client.currentScreen == null) {
        if ($PalladiumKeyMappings.OPEN_EQUIPMENT.isDown()) {
            Client.player.sendData('satsu_iron_man_addon.openEquipmentKey');
        }
    }
})