StartupEvents.registry("palladium:abilities", (event) => {
  event
    .create("satsu_iron_man_addon:particle_dome")
    .icon(palladium.createItemIcon("minecraft:shield"))
    .addProperty("particles", "boolean", true, "Spawn particles")
    .addProperty("particletype", "string", "dust 0 0 0 1", "nbt particle")
    .addProperty(
      "random",
      "boolean",
      true,
      "Spawn random particles inside the sphere",
    )
    .addProperty(
      "particle_count",
      "integer",
      20,
      "Number of particles to spawn",
    )
    .addProperty("radius", "float", 1.05, "Radius of the particle sphere")
    .addProperty("height_center", "float", 1.1, "height of the center")
    .addProperty("still", "boolean", true, "Apply slowness effect while active")
    .tick((entity, entry, holder, enabled) => {
      if (enabled) {
        var spawnParticles = entry.getPropertyByName("particles");

        let level = entity.getLevel(); // <-- aqu� defines level
        let player = entity; // <-- entity es el jugador
        let server = entity.server;
        if (entry.getPropertyByName("still")) {
          try {
            server.runCommandSilent(
              "/effect give " +
                player.name.string +
                " minecraft:slowness 2 10 true",
            );
          } catch (e) {}
        }
        if (spawnParticles) {
          let radius = Number(entry.getPropertyByName("radius"));
          let particleType = entry.getPropertyByName("particletype");
          let particle = Utils.particleOptions(particleType);
          let particleCount =
            Number(entry.getPropertyByName("particle_count")) || 20;
          let doRandom = entry.getPropertyByName("random");
          let height_center = entry.getPropertyByName("height_center");

          if (doRandom) {
            for (let i = 0; i < particleCount; i++) {
              let theta = Math.acos(2 * Math.random() - 1);
              let phi = 2 * JavaMath.PI * Math.random();

              let xOffset = radius * Math.sin(theta) * Math.cos(phi);
              let yOffset = radius * Math.sin(theta) * Math.sin(phi);
              let zOffset = radius * Math.cos(theta);

              level.spawnParticles(
                particle,
                true,
                player.x + xOffset,
                player.y + yOffset + height_center,
                player.z + zOffset,
                0,
                0,
                0,
                1,
                0,
              );
            }
          } else {
            // deterministic distribution: evenly on a latitude circle
            for (let i = 0; i < particleCount; i++) {
              let theta = (i / particleCount) * 2 * JavaMath.PI;
              let xOffset = radius * Math.cos(theta);
              let zOffset = radius * Math.sin(theta);
              let yOffset = 0;
              // use configured height_center for deterministic case as well
              let height_center =
                Number(entry.getPropertyByName("height_center")) || 1.1;
              level.spawnParticles(
                particle,
                true,
                player.x + xOffset,
                player.y + yOffset + height_center,
                player.z + zOffset,
                0,
                0,
                0,
                1,
                0,
              );
            }
          }
        }
      }
    })
    .lastTick((entity, entry, holder, enabled) => {
      let player = entity;
      let server = entity.server;

      if (entry.getPropertyByName("still")) {
        try {
          server.runCommandSilent(
            "/effect clear " + player.name.string + " slowness",
          );
        } catch (e) {}
      }
    });
});
