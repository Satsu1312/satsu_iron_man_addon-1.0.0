let ClientboundSetEntityMotionPacket = Java.loadClass(
  "net.minecraft.network.protocol.game.ClientboundSetEntityMotionPacket",
);

StartupEvents.registry("palladium:abilities", (event) => {
  event
    .create("satsu_iron_man_addon:wall_climb")
    .icon(palladium.createItemIcon("minecraft:ladder"))
    .addProperty(
      "climb_speed",
      "float",
      0.2,
      "The speed at which you can climb",
    )
    .tick((entity, entry, holder, enabled) => {
      if (!enabled) return false;
      if (!entity || !entity.isPlayer()) return false;

      let look = entity.getLookAngle();

      let blockPos = entity
        .blockPosition()
        .offset(Math.round(look.x()), 0, Math.round(look.z()));

      let level = entity.level;
      let state = level.getBlockState(blockPos);
      let climb_speed = entry.getPropertyByName("climb_speed");

      if (state.isCollisionShapeFullBlock(level, blockPos)) {
        entity.setMotion(0, climb_speed, 0);
        entity.connection.send(new ClientboundSetEntityMotionPacket(entity));
      }
    });
});
