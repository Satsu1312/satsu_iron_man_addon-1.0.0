NetworkEvents.dataReceived("satsu_iron_man_addon.openEquipmentKey", event => {
    const player = event.player;
    player.persistentData.putBoolean("satsu_iron_man_addon.open_equipment_pressed", true);
});

ServerEvents.tick(event => {
    for (const player of event.server.players) {
        // Reinicia el flag cada tick
        player.persistentData.putBoolean("satsu_iron_man_addon.open_equipment_pressed", false);
    }
});