StartupEvents.registry('palladium:abilities', (event) => {

    event.create('satsu_iron_man_addon:particle_dome')
        .icon(palladium.createItemIcon('minecraft:shield'))
        .addProperty('particles', 'boolean', true, 'Spawn particles')
        .addProperty('particletype', 'string', 'dust 0 0 0 1', 'particle type ')
        .addProperty('random', 'boolean', true, 'Spawn random particles inside the sphere')
        .addProperty('particle_count', 'integer', 36, 'Number of particles to spawn')
        .addProperty('radius', 'float', 1.05, 'Radius')
        .addProperty('height_center', 'float', 1.1, 'height of the center')
        .addProperty('still', 'boolean', true, 'Apply slowness effect while active')
        .addProperty('motion', 'boolean', true, 'Push nearby entities outward when true')
        .addProperty('motion_strength', 'float', 0.6, 'Strength of the outward push')
        .tick((entity, entry, holder, enabled) => {
            if (enabled) {
                var spawnParticles = entry.getPropertyByName('particles');

                let level = entity.getLevel(); // <-- aquí defines level
                let player = entity;           // <-- entity es el jugador
                let server = entity.server;
                if (entry.getPropertyByName('still')) {
                    try { server.runCommandSilent('/effect give ' + player.name.string + ' minecraft:slowness 2 10 true'); } catch (e) { }
                }
                if (spawnParticles) {
                    let radius = Number(entry.getPropertyByName('radius'));
                    let particleType = entry.getPropertyByName('particletype');
                    let particle = Utils.particleOptions(particleType);
                    let particleCount = Number(entry.getPropertyByName('particle_count')) || 20;
                    let doRandom = entry.getPropertyByName('random');
                    let height_center = entry.getPropertyByName('height_center');

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
                                0, 0, 0,
                                1,
                                0
                            );
                        }
                    } else {
                        for (let i = 0; i < particleCount; i++) {
                            let theta = (i / particleCount) * 2 * JavaMath.PI;
                            let xOffset = radius * Math.cos(theta);
                            let zOffset = radius * Math.sin(theta);
                            let yOffset = 0;
                            let height_center = Number(entry.getPropertyByName('height_center')) || 1.1;
                            level.spawnParticles(
                                particle,
                                true,
                                player.x + xOffset,
                                player.y + yOffset + height_center,
                                player.z + zOffset,
                                0, 0, 0,
                                1,
                                0
                            );
                        }
                    }
                }

                // optional outward motion: push nearby entities away from center
                if (entry.getPropertyByName('motion')) {
                    // load Java classes
                    let ClientboundSetEntityMotionPacket = Java.loadClass('net.minecraft.network.protocol.game.ClientboundSetEntityMotionPacket');
                    let Vec3 = Java.loadClass('net.minecraft.world.phys.Vec3');
                    let AABB = Java.loadClass('net.minecraft.world.phys.AABB');
                    let EntityClass = Java.loadClass('net.minecraft.world.entity.Entity');

                    let radius = Number(entry.getPropertyByName('radius')) || 1.05;
                    let strength = Number(entry.getPropertyByName('motion_strength')) || 0.6;

                    let cx = entity.getX();
                    let cy = entity.getY() + (Number(entry.getPropertyByName('height_center')) || 1.1);
                    let cz = entity.getZ();

                    let aabb = new AABB(cx - radius, cy - radius, cz - radius, cx + radius, cy + radius, cz + radius);
                    let list = entity.level.getEntitiesOfClass(EntityClass, aabb);
                    for (let i = 0; i < list.size(); i++) {
                        let target = list.get(i);
                        if (!target || target.equals(entity)) continue;

                        let dx = target.getX() - cx;
                        let dy = target.getY() - cy;
                        let dz = target.getZ() - cz;
                        let len = Math.sqrt(dx * dx + dy * dy + dz * dz);
                        if (len > radius || len <= 1e-6) continue;

                        // horizontal outward push (preserve some upward)
                        let nx = dx / len;
                        let nz = dz / len;
                        let motion = new Vec3(nx, 0.2, nz).scale(strength);
                        try { target.setDeltaMovement(motion); } catch (e) {}
                        try {
                            if (target.isPlayer && target.isPlayer()) {
                                if (target.connection) target.connection.send(new ClientboundSetEntityMotionPacket(target));
                            }
                        } catch (e) {}
                    }
                }
            }
        })
        .lastTick((entity, entry, holder, enabled) => {
            let player = entity;
            let server = entity.server;

            if (entry.getPropertyByName('still')) {
                try { server.runCommandSilent('/effect clear ' + player.name.string + ' slowness'); } catch (e) {}
            }
        });
});