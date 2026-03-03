ServerEvents.commandRegistry(event => {
    const { commands: Commands } = event;

    event.register(
        Commands.literal("satsu_test")
            .executes(ctx => {
                const player = ctx.source.player;
                let value = palladium.getProperty(player, 'satsu_iron_man_addon_mark_property');
                let radius = 10;

                // Obtener el valor del scoreboard grave.ID del jugador
                
                let playerScore = palladium.scoreboard.getScore(player, "grave.ID")

                // Filtrar armor stands cercanos con el mismo scoreboard
                let nearbyArmorStands = player.level.getEntitiesWithin(
                    AABB.of(player.x - radius, player.y - radius, player.z - radius,
                        player.x + radius, player.y + radius, player.z + radius)
                ).filter(e =>
                    e !== player &&
                    e.type == 'minecraft:armor_stand' &&
                    palladium.scoreboard.getScore(e, "grave.ID") === playerScore
                );

                if (nearbyArmorStands[0]) {
                    let armor_stand = nearbyArmorStands[0];
                    palladium.setProperty(armor_stand, 'satsu_iron_man_addon_mark_property', value);
                    return 1;
                } else return 0;
            })
    );
});