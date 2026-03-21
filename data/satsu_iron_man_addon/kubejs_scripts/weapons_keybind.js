NetworkEvents.dataReceived("satsu_iron_man_addon.weaponsSystemKey", event => {
    let entity = event.entity;
    const player = event.player;
    player.persistentData.putBoolean("satsu_iron_man_addon.weaponsSystemKey_pressed", true);
    entity.setStatusMessage("pressed key");
});

// Ejemplo de uso en otro evento
ServerEvents.tick(event => {
    for (const player of event.server.players) {
        if (player.persistentData.getBoolean("satsu_iron_man_addon.weaponsSystemKey_pressed")) {
            // Ejecuta la acción
            // ...

            // Reinicia solo si fue usado
            player.persistentData.putBoolean("satsu_iron_man_addon.weaponsSystemKey_pressed", false);
        }
    }
});