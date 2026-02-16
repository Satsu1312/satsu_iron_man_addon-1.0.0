let ClientboundSetEntityMotionPacket = Java.loadClass(
  "net.minecraft.network.protocol.game.ClientboundSetEntityMotionPacket",
);
let Vec3 = Java.loadClass("net.minecraft.world.phys.Vec3");
let AABB = Java.loadClass("net.minecraft.world.phys.AABB");
let EntityClass = Java.loadClass("net.minecraft.world.entity.Entity");

StartupEvents.registry("palladium:abilities", (event) => {
  event
    .create("satsu_iron_man_addon:lightning_2d_shield_circle")
    .icon(palladium.createItemIcon("minecraft:shield"))
    .addProperty(
      "max_distance",
      "integer",
      8,
      "Max distance to select targets at",
    )
    .addProperty("grip_distance", "integer", 5, "Distance to hold targets at")
    .addProperty("distance", "integer", 3, "Raycast distance for the ring")
    .addProperty("ring_count", "integer", 4, "Number of rings")
    .addProperty("ring_spacing", "float", 0.6, "Distance between each ring")
    .addProperty("particle_count", "integer", 20, "how many particles")
    .addProperty("particles", "boolean", true, "Spawn particles")
    .addProperty("particletype", "string", "soul_fire_flame", "nbt particle")
    .addProperty("baseRadius", "float", 1.05, "initial radius")
    .addProperty(
      "random_particles",
      "boolean",
      false,
      "Spawn random particles inside the rings",
    )
    .addProperty(
      "push_away",
      "boolean",
      false,
      "Push entities away from the ring zone",
    )
    .tick((entity, entry, holder, enabled) => {
      if (enabled) {
        var spawnParticles = entry.getPropertyByName("particles");

        let level = entity.getLevel();
        let player = entity;

        if (spawnParticles) {
          let baseRadius = entry.getPropertyByName("baseRadius");
          let particleType = entry.getPropertyByName("particletype");
          let particle = Utils.particleOptions(particleType);
          let particleCount = entry.getPropertyByName("particle_count");
          let dist = entry.getPropertyByName("distance");
          let ringCount = entry.getPropertyByName("ring_count");
          let ringSpacing = entry.getPropertyByName("ring_spacing");

          let eyePos = entity.eyePosition;
          let viewVec = entity.getViewVector(1);

          // build two perpendicular axes to the view vector for the ring plane
          let upX = 0,
            upY = 1,
            upZ = 0;
          if (Math.abs(viewVec.y()) > 0.9) {
            upX = 1;
            upY = 0;
            upZ = 0;
          }

          // right = viewVec x up
          let rightX = viewVec.y() * upZ - viewVec.z() * upY;
          let rightY = viewVec.z() * upX - viewVec.x() * upZ;
          let rightZ = viewVec.x() * upY - viewVec.y() * upX;
          let rightLen = Math.sqrt(
            rightX * rightX + rightY * rightY + rightZ * rightZ,
          );
          rightX /= rightLen;
          rightY /= rightLen;
          rightZ /= rightLen;

          // actualUp = right x viewVec
          let actualUpX = rightY * viewVec.z() - rightZ * viewVec.y();
          let actualUpY = rightZ * viewVec.x() - rightX * viewVec.z();
          let actualUpZ = rightX * viewVec.y() - rightY * viewVec.x();

          // spawn multiple rings, each further away and smaller
          for (let r = 0; r < ringCount; r++) {
            let ringDist = dist + r * ringSpacing;
            let scale = 1 - r * 0.2;
            let ringRadius = baseRadius * scale;
            let ringParticles = Math.max(5, Math.floor(particleCount * scale));

            let centerX = eyePos.x() + viewVec.x() * ringDist;
            let centerY = eyePos.y() + viewVec.y() * ringDist;
            let centerZ = eyePos.z() + viewVec.z() * ringDist;

            for (let i = 0; i < ringParticles; i++) {
              let theta = (i / ringParticles) * 2 * JavaMath.PI;

              let cosT = Math.cos(theta);
              let sinT = Math.sin(theta);

              let px =
                centerX + ringRadius * (cosT * rightX + sinT * actualUpX);
              let py =
                centerY + ringRadius * (cosT * rightY + sinT * actualUpY);
              let pz =
                centerZ + ringRadius * (cosT * rightZ + sinT * actualUpZ);

              level.spawnParticles(particle, true, px, py, pz, 0, 0, 0, 1, 0);
            }

            // random particles inside the ring (like lightning_shield_circle)
            let doRandom = entry.getPropertyByName("random_particles");
            if (doRandom) {
              let randomCount = Math.max(3, Math.floor(ringParticles / 2));
              for (let j = 0; j < randomCount; j++) {
                let rTheta = Math.acos(2 * Math.random() - 1);
                let rPhi = 2 * JavaMath.PI * Math.random();

                let rRight = ringRadius * Math.sin(rTheta) * Math.cos(rPhi);
                let rUp = ringRadius * Math.sin(rTheta) * Math.sin(rPhi);
                let rFwd = ringRadius * 0.15 * Math.cos(rTheta);

                let rpx =
                  centerX +
                  rRight * rightX +
                  rUp * actualUpX +
                  rFwd * viewVec.x();
                let rpy =
                  centerY +
                  rRight * rightY +
                  rUp * actualUpY +
                  rFwd * viewVec.y();
                let rpz =
                  centerZ +
                  rRight * rightZ +
                  rUp * actualUpZ +
                  rFwd * viewVec.z();

                level.spawnParticles(
                  particle,
                  true,
                  rpx,
                  rpy,
                  rpz,
                  0,
                  0,
                  0,
                  1,
                  0,
                );
              }
            }
          }

          // Push away entities from the ring zone
          let pushAway = entry.getPropertyByName("push_away");
          if (pushAway) {
            let furthestDist = dist + (ringCount - 1) * ringSpacing;
            let maxR = baseRadius;

            for (let r = 0; r < ringCount; r++) {
              let ringDist = dist + r * ringSpacing;
              let scale = 1 - r * 0.2;
              let ringRadius = baseRadius * scale;

              let cx = eyePos.x() + viewVec.x() * ringDist;
              let cy = eyePos.y() + viewVec.y() * ringDist;
              let cz = eyePos.z() + viewVec.z() * ringDist;

              let aabb = new AABB(
                cx - ringRadius,
                cy - ringRadius,
                cz - ringRadius,
                cx + ringRadius,
                cy + ringRadius,
                cz + ringRadius,
              );
              let list = level.getEntitiesOfClass(EntityClass, aabb);

              for (let i = 0; i < list.size(); i++) {
                let target = list.get(i);
                if (!target || target.equals(entity)) continue;

                let dx = target.getX() - cx;
                let dy = target.getY() - cy;
                let dz = target.getZ() - cz;
                let len = Math.sqrt(dx * dx + dy * dy + dz * dz);

                if (len > ringRadius || len <= 1e-6) continue;

                dx = dx / len;
                dy = dy / len;
                dz = dz / len;

                // Check if push direction goes toward the player
                let toPlayerX = entity.getX() - cx;
                let toPlayerY = entity.getY() - cy;
                let toPlayerZ = entity.getZ() - cz;
                let dot = dx * toPlayerX + dy * toPlayerY + dz * toPlayerZ;
                if (dot > 0) continue;

                let motion = new Vec3(dx, dy, dz).scale(0.5);
                target.setDeltaMovement(motion);

                if (target.isPlayer()) {
                  target.connection.send(
                    new ClientboundSetEntityMotionPacket(target),
                  );
                }
              }
            }
          }
        }
      }
    });
});
