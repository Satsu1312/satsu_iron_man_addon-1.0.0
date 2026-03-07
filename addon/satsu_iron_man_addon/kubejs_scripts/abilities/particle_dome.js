StartupEvents.registry('palladium:abilities', (event) => {
  event.create('satsu_iron_man_addon:particle_dome')
    .icon(palladium.createItemIcon('minecraft:shield'))
    .documentationDescription("Spawn a particle dome with optional slowness and outward push.")
    .addProperty('particles', 'boolean', true, 'Spawn particles')
    .addProperty('particletype', 'string', 'dust 0 0 0 1', 'Particle type')
    .addProperty('random', 'boolean', true, 'Random particles inside sphere')
    .addProperty('particle_count', 'integer', 36, 'Number of particles')
    .addProperty('radius', 'float', 1.05, 'Radius')
    .addProperty('height_center', 'float', 1.1, 'Center height offset')
    .addProperty('still', 'boolean', true, 'Apply slowness effect')
    .addProperty('motion', 'boolean', true, 'Push nearby entities outward')
    .addProperty('motion_strength', 'float', 0.6, 'Outward push strength')

    .tick((entity, entry, holder, enabled) => {
      if (!enabled) return;

      const level = entity.getLevel();
      const player = entity;
      const server = entity.server;

      // Slowness effect
      if (entry.getPropertyByName('still')) {
        try {
          server.runCommandSilent(`/effect give ${player.name.string} minecraft:slowness 2 10 true`);
        } catch (e) {}
      }

      // Particle spawning
      if (entry.getPropertyByName('particles')) {
        const radius = Number(entry.getPropertyByName('radius'));
        const particleType = entry.getPropertyByName('particletype');
        const particle = Utils.particleOptions(particleType);
        const particleCount = Number(entry.getPropertyByName('particle_count')) || 20;
        const heightCenter = Number(entry.getPropertyByName('height_center')) || 1.1;

        if (entry.getPropertyByName('random')) {
          for (let i = 0; i < particleCount; i++) {
            const theta = Math.acos(2 * Math.random() - 1);
            const phi = 2 * JavaMath.PI * Math.random();

            const xOffset = radius * Math.sin(theta) * Math.cos(phi);
            const yOffset = radius * Math.sin(theta) * Math.sin(phi);
            const zOffset = radius * Math.cos(theta);

            level.spawnParticles(particle, true,
              player.x + xOffset,
              player.y + yOffset + heightCenter,
              player.z + zOffset,
              0, 0, 0, 1, 0
            );
          }
        } else {
          for (let i = 0; i < particleCount; i++) {
            const theta = (i / particleCount) * 2 * JavaMath.PI;
            const xOffset = radius * Math.cos(theta);
            const zOffset = radius * Math.sin(theta);

            level.spawnParticles(particle, true,
              player.x + xOffset,
              player.y + heightCenter,
              player.z + zOffset,
              0, 0, 0, 1, 0
            );
          }
        }
      }

      // Outward motion
      if (entry.getPropertyByName('motion')) {
        const ClientboundSetEntityMotionPacket = Java.loadClass('net.minecraft.network.protocol.game.ClientboundSetEntityMotionPacket');
        const Vec3 = Java.loadClass('net.minecraft.world.phys.Vec3');
        const AABB = Java.loadClass('net.minecraft.world.phys.AABB');
        const EntityClass = Java.loadClass('net.minecraft.world.entity.Entity');

        const radius = Number(entry.getPropertyByName('radius')) || 1.05;
        const strength = Number(entry.getPropertyByName('motion_strength')) || 0.6;
        const cx = entity.getX();
        const cy = entity.getY() + (Number(entry.getPropertyByName('height_center')) || 1.1);
        const cz = entity.getZ();

        const aabb = new AABB(cx - radius, cy - radius, cz - radius, cx + radius, cy + radius, cz + radius);
        const list = entity.level.getEntitiesOfClass(EntityClass, aabb);

        for (let i = 0; i < list.size(); i++) {
          const target = list.get(i);
          if (!target || target.equals(entity)) continue;

          const dx = target.getX() - cx;
          const dy = target.getY() - cy;
          const dz = target.getZ() - cz;
          const len = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (len > radius || len <= 1e-6) continue;

          const nx = dx / len;
          const nz = dz / len;
          const motion = new Vec3(nx, 0.2, nz).scale(strength);

          try { target.setDeltaMovement(motion); } catch (e) {}
          try {
            if (target.isPlayer && target.isPlayer() && target.connection) {
              target.connection.send(new ClientboundSetEntityMotionPacket(target));
            }
          } catch (e) {}
        }
      }
    })

    .lastTick((entity, entry) => {
      if (entry.getPropertyByName('still')) {
        try {
          entity.server.runCommandSilent(`/effect clear ${entity.name.string} slowness`);
        } catch (e) {}
      }
    });
});