// Made by FSang18 (Optimizado)
StartupEvents.registry("palladium:condition_serializer", (event) => {
  
  // 1. Mirar hacia abajo (Pitch positivo alto)
  event.create("satsu_iron_man_addon:looking_down")
    .addProperty("range", "integer", 90, "Max angle for the looking range.")
    .test((entity, props) => {
      if (!entity || !entity.isPlayer()) return false;
      return entity.getRotationVector().x >= props.get("range");
    });

  // 2. Mirar hacia la derecha (Yaw positivo alto)
  event.create("satsu_iron_man_addon:looking_right")
    .addProperty("range", "integer", 90, "Max angle for the looking range.")
    .test((entity, props) => {
      if (!entity || !entity.isPlayer()) return false;
      return entity.getRotationVector().y >= props.get("range");
    });

  // 3. Mirar hacia arriba (Pitch negativo bajo)
  event.create("satsu_iron_man_addon:looking_up")
    .addProperty("range", "integer", 90, "Max angle for the looking range.")
    .test((entity, props) => {
      if (!entity || !entity.isPlayer()) return false;
      return entity.getRotationVector().x <= -props.get("range");
    });

  // 4. Mirar hacia la izquierda (Yaw negativo bajo)
  event.create("satsu_iron_man_addon:looking_left")
    .addProperty("range", "integer", 90, "Max angle for the looking range.")
    .test((entity, props) => {
      if (!entity || !entity.isPlayer()) return false;
      return entity.getRotationVector().y <= -props.get("range");
    });
});