ServerEvents.tick(event => {
    let players = event.server.players
    
    players.forEach(player => {
        // Validación de seguridad por si el jugador es nulo o se está desconectando
        if (!player) return

        let hasFreezeResistanceAbility = false

        // Escaneamos las habilidades activas del jugador usando Palladium
        try {
            palladium.abilities.getEntries(player).forEach(entry => {
                const abilityId = entry.getConfiguration()?.ability?.id;
                
                // Reemplaza con el ID exacto de la habilidad de Palladium de tu traje ártico
                if (abilityId === "satsu_iron_man_addon:freeze_prevent") {
                    hasFreezeResistanceAbility = true;
                }
            });
        } catch(e) {}

        // Si el jugador no tiene la habilidad activa, nos saltamos lo demás
        if (!hasFreezeResistanceAbility) return

        // Si la tiene activa y acumula frío, limpiamos el congelamiento al instante
        if (player.ticksFrozen > 0) {
            player.setTicksFrozen(0)
        }
    })
})