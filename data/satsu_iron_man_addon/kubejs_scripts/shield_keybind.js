NetworkEvents.dataReceived("satsu_iron_man_addon.shieldEnablingKey", event => {
    const player = event.player;
    const dataKey = "satsu_iron_man_addon.shield_enabling_pressed";
    
    // Obtenemos el valor actual (si no existe, por defecto es false)
    let currentState = player.persistentData.getBoolean(dataKey);
    
    // INVERTIMOS el valor: si era true pasa a false, si era false pasa a true.
    player.persistentData.putBoolean(dataKey, !currentState);
});