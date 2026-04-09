const $Satsu_iron_man_addonKeyMappings = Java.loadClass('dev.architectury.registry.client.keymappings.KeyMappingRegistry');

ClientEvents.tick(event => {
    if (Client.currentScreen == null) {
        if (global['SHIELD_ENABLING'].consumeClick()) {
            // consumeClick devuelve true solo cuando se presiona (no cuando se mantiene)
            Client.player.sendData('satsu_iron_man_addon.shieldEnablingKey');
        }
    }
});