//made by WolfDude24
//inspired by codec's screenshake ability and with help from phantompig
ClientEvents.tick((event) => {
  let player = event.player;

  if (!player) return;

  palladium.abilities.getEntries(player).forEach((entry) => {
    if (
      entry.getConfiguration().ability.id == "satsu_iron_man_addon:target_lock" &&
      entry.enabled
    ) {
      let rangeProp = entry.getPropertyByName("range");
      let range = rangeProp ? rangeProp : 16;

      let modeProp = entry.getPropertyByName("mode");
      let mode = modeProp ? `${modeProp}` : "raytrace";

      if (!player.persistentData.target_lock_uuid) {
        let target = null;

        if (mode == "raytrace") {
          let result = player.rayTrace(range);

          if (result && result.entity) {
            target = result.entity;
          }
        } else if (mode == "nearest") {
          let nearestDistance = range;

          player.level.getEntities().forEach((entity) => {
            if (entity == player) return;
            if (!entity.isAlive()) return;

            if (
              entity.type == "minecraft:item" ||
              entity.type == "minecraft:item_frame" ||
              entity.type == "minecraft:glow_item_frame" ||
              entity.type == "minecraft:arrow" ||
              entity.type == "minecraft:spectral_arrow" ||
              entity.type == "minecraft:trident" ||
              entity.type.contains("fireball") ||
              entity.type.contains("projectile")
            )
              return;

            let dx = entity.getX() - player.getX();
            let dy = entity.getY() - player.getY();
            let dz = entity.getZ() - player.getZ();

            let distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (distance <= nearestDistance) {
              nearestDistance = distance;

              target = entity;
            }
          });
        } else if (mode == "random") {
          let possibleTargets = [];

          player.level.getEntities().forEach((entity) => {
            if (entity == player) return;
            if (!entity.isAlive()) return;

            if (
              entity.type == "minecraft:item" ||
              entity.type == "minecraft:item_frame" ||
              entity.type == "minecraft:glow_item_frame" ||
              entity.type == "minecraft:arrow" ||
              entity.type == "minecraft:spectral_arrow" ||
              entity.type == "minecraft:trident" ||
              entity.type.contains("fireball") ||
              entity.type.contains("projectile")
            )
              return;

            let dx = entity.getX() - player.getX();
            let dy = entity.getY() - player.getY();
            let dz = entity.getZ() - player.getZ();

            let distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (distance <= range) {
              possibleTargets.push(entity);
            }
          });

          if (possibleTargets.length > 0) {
            target =
              possibleTargets[
                Math.floor(Math.random() * possibleTargets.length)
              ];
          }
        }

        if (!target) return;

        player.persistentData.target_lock_uuid = `${target.uuid}`;
      }

      let target = null;

      player.level.getEntities().forEach((entity) => {
        if (`${entity.uuid}` == player.persistentData.target_lock_uuid) {
          target = entity;
        }
      });

      if (!target || !target.isAlive()) {
        delete player.persistentData.target_lock_uuid;

        return;
      }

      let dx = target.getX() - player.getX();

      let dy = target.getY() + target.getBbHeight() * 0.5 - player.getEyeY();

      let dz = target.getZ() - player.getZ();

      let yaw = Math.atan2(-dx, dz) * 57.295776;

      let pitch =
        Math.asin(-dy / Math.sqrt(dx * dx + dy * dy + dz * dz)) * 57.295776;

      player.setYaw(yaw);
      player.setPitch(pitch);
    } else if (
      entry.getConfiguration().ability.id == "satsu_iron_man_addon:target_lock"
    ) {
      delete player.persistentData.target_lock_uuid;
    }
  });
});
