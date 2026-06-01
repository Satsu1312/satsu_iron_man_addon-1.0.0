NetworkEvents.dataReceived("satsu_iron_man_addon.refresh_heat", event => {
    let entity = event.entity;
    const player = event.player;
    player.persistentData.putBoolean("satsu_iron_man_addon.refresh_heat_pressed", true);
});

// Ejemplo de uso en otro evento
ServerEvents.tick(event => {
    for (const player of event.server.players) {
        if (player.persistentData.getBoolean("satsu_iron_man_addon.refresh_heat_pressed")) {
            // Ejecuta la acción
            // ...

            // Reinicia solo si fue usado
            player.persistentData.putBoolean("satsu_iron_man_addon.refresh_heat_pressed", false);
        }
    }
});