// Carpeta: server_scripts
EntityEvents.spawned("minecraft:player", (event) => {
  const { player, server } = event;

  // Un pequeño delay de 10 ticks para evitar conflictos de carga
  server.scheduleInTicks(10, () => {
    if (!player) return;

    let currentName = player.username;

    // Usamos el método nativo de Palladium para guardar la propiedad
    // Nota: El ID debe coincidir con el que registraste en startup
    palladium.setProperty(player, "satsu_iron_man_addon_player_username", currentName);
  });
});
