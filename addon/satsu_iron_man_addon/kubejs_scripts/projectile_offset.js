//Originally made by phantompig but edited to copy the palladium property by FSang18 with help from Codec

const Vec3 = Java.loadClass("net.minecraft.world.phys.Vec3");

StartupEvents.registry("palladium:abilities", (event) => {
  event
    .create("satsu_iron_man_addon:projectile_with_offset")
    .icon(palladium.createItemIcon("minecraft:egg"))
    .documentationDescription(
      "Fires a projectile at a local pitch and yaw offset relative to where the player is looking (velocity is still applied so that the projectile is fired where the entity with the power is aiming) (all angles are measured in degrees) (for reference, yaw is left-to-right rotation, and pitch is up-and-down rotation)"
    )
    .addProperty(
      "entity_type",
      "string",
      "minecraft:snowball",
      "The entity ID for the projectile to be fired"
    )
    .addProperty(
      "entity_data",
      "compound_tag",
      null,
      "NBT data for the projectile entity"
    )
    .addProperty(
      "yaw_offset",
      "float",
      0.0,
      "The value to be added to the source entity's yaw (resulting in the projectile originating from somewhere else on the entity with the power)"
    )
    .addProperty(
      "pitch_offset",
      "float",
      0.0,
      "The value to be added to the source entity's pitch (resulting in the projectile originating from somewhere else on the entity with the power)"
    )
    .addProperty(
      "yaw_inaccuracy",
      "float",
      0.0,
      "The maximum value to be randomly added or subtracted from the entity's yaw (resulting in an inaccuracy effect)"
    )
    .addProperty(
      "pitch_inaccuracy",
      "float",
      0.0,
      "The maximum value to be randomly added or subtracted from the entity's pitch (resulting in an inaccuracy effect)"
    )
    .addProperty(
      "yaw_override",
      "float",
      null,
      "Locks the calculated yaw value to this (setting this to null will make it ignored"
    )
    .addProperty(
      "pitch_override",
      "float",
      null,
      "Locks the calculated pitch value to this (setting this to null will make it ignored"
    )
    .addProperty(
      "count",
      "integer",
      1,
      "The number of projectiles to be fired each tick the ability is active"
    )
    .addProperty("speed", "float", 5.0, "The speed of the projectile")
    .addProperty(
      "align_velocity_with_calculated_rotation",
      "boolean",
      false,
      "If true, the projectile's velocity will be calculated using the new pitch and yaw values (which are affected by offsets and overrides) instead of only source entity's rotation"
    )
    .addProperty(
      "source_property",
      "string",
      "",
      "Palladium property key to read from the player"
    )
    .addProperty(
      "projectile_property",
      "string",
      "",
      "Palladium property key to write onto the spawned projectile"
    )
    .tick((entity, entry, holder, enabled) => {
      if (enabled) {
        const TYPE = entry.getPropertyByName("entity_type");
        const NBT = entry.getPropertyByName("entity_data");
        const YAW_OFFSET = entry.getPropertyByName("yaw_offset");
        const PITCH_OFFSET = entry.getPropertyByName("pitch_offset");
        const YAW_INACC = entry.getPropertyByName("yaw_inaccuracy");
        const PITCH_INACC = entry.getPropertyByName("pitch_inaccuracy");
        const YAW_OVERRIDE = entry.getPropertyByName("yaw_override");
        const PITCH_OVERRIDE = entry.getPropertyByName("pitch_override");
        const COUNT = entry.getPropertyByName("count");
        const SPEED = entry.getPropertyByName("speed");
        const ALIGN_VEL_WITH_CALC_ROT = entry.getPropertyByName(
          "align_velocity_with_calculated_rotation"
        );
        const SRC_PROP = entry.getPropertyByName("source_property");
        const PROJ_PROP = entry.getPropertyByName("projectile_property");

        for (let i = 0; i < COUNT; i++) {
          let calcYawInacc = Math.random() * 2 * YAW_INACC - YAW_INACC;
          let calcPitchInacc = Math.random() * 2 * PITCH_INACC - PITCH_INACC;

          let projectile = entity.block.createEntity(TYPE);
          if (NBT != null) projectile.mergeNbt(NBT);

          var yaw = -toRadians(entity.getYaw() + YAW_OFFSET + calcYawInacc);
          var pitch = -toRadians(
            entity.getPitch() + PITCH_OFFSET + calcPitchInacc
          );

          if (YAW_OVERRIDE != null) yaw = toRadians(YAW_OVERRIDE);
          if (PITCH_OVERRIDE != null) pitch = toRadians(PITCH_OVERRIDE);

          var x = entity.x + Math.cos(pitch) * Math.sin(yaw),
            y = entity.y + entity.getEyeHeight() + Math.sin(pitch),
            z = entity.z + Math.cos(pitch) * Math.cos(yaw);

          projectile.setPos(x, y, z);
          if (!ALIGN_VEL_WITH_CALC_ROT) {
            projectile.setDeltaMovement(
              entity.getLookAngle().scale(SPEED).add(entity.getDeltaMovement())
            );
          } else {
            projectile.setDeltaMovement(
              Vec3.directionFromRotation(toDegrees(-pitch), toDegrees(-yaw))
                .scale(SPEED)
                .add(entity.getDeltaMovement())
            );
          }
          projectile.setOwner(entity);
          projectile.spawn();

          if (SRC_PROP && PROJ_PROP) {
            const value = palladium.getProperty(entity, SRC_PROP);
            if (value !== null && value !== undefined) {
              palladium.setProperty(projectile, PROJ_PROP, value);
            }
          }
        }
      }
    });
});

function toRadians(degrees) {
  return (degrees * JavaMath.PI) / 180;
}

function toDegrees(radians) {
  return (radians * 180) / JavaMath.PI;
}
