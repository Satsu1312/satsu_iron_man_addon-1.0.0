ServerEvents.tick(event => {
    let players = event.server.players
    
    players.forEach(player => {
        // Validación de seguridad por si el jugador es nulo o se está desconectando
        if (!player) return

        let isAbilityEnabled = false

        // Escaneamos las entradas de habilidades usando Palladium
        try {
            palladium.abilities.getEntries(player).forEach(entry => {
                const abilityId = entry.getConfiguration()?.ability?.id;
                
                if (abilityId === "satsu_iron_man_addon:freeze_prevent") {
                    // Verificamos si la entrada específica está habilitada en este preciso tick
                    if (entry.isEnabled()) {
                        isAbilityEnabled = true;
                    }
                }
            });
        } catch(e) {}

        // Si la habilidad no está habilitada, el script se detiene aquí para ahorrar recursos
        if (!isAbilityEnabled) return

        // Si está habilitada y el jugador acumula frío, limpiamos el congelamiento al instante
        if (player.ticksFrozen > 0) {
            player.setTicksFrozen(0)
        }
    })
})