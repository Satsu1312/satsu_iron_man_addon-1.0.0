StartupEvents.registry("palladium:condition_serializer", (event) => {
  event.create("satsu_iron_man_addon:is_jumping_up").test((entity, props) => {
    if (!entity.isPlayer()) {
      return false;
    }
    const verticalMotion = entity.getDeltaMovement().y();
    if (verticalMotion > 0.01) {
      return true;
    } else {
      return false;
    }
  });
});
