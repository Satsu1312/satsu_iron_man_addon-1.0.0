//Made by FSang18
StartupEvents.registry("palladium:condition_serializer", (event) => {
  event
    .create("satsu_iron_man_addon:looking_down")

    .addProperty("range", "integer", 90, "Max angle for the looking range.")

    .test((entity, props) => {
      if (entity.isPlayer()) {
        let angle_range = props.get("range");
        let pitch = entity.getRotationVector().x;
        return pitch >= angle_range;
      }
      return false;
    });
});

StartupEvents.registry("palladium:condition_serializer", (event) => {
  event
    .create("satsu_iron_man_addon:looking_right")

    .addProperty("range", "integer", 90, "Max angle for the looking range.")

    .test((entity, props) => {
      if (entity.isPlayer()) {
        let angle_range = props.get("range");
        let yaw = entity.getRotationVector().y;
        return yaw >= angle_range;
      }
      return false;
    });
});

StartupEvents.registry("palladium:condition_serializer", (event) => {
  event
    .create("satsu_iron_man_addon:looking_up")

    .addProperty("range", "integer", 90, "Max angle for the looking range.")

    .test((entity, props) => {
      if (entity.isPlayer()) {
        let angle_range = props.get("range");
        let pitch = entity.getRotationVector().x;
        return pitch <= -angle_range;
      }
      return false;
    });
});

StartupEvents.registry("palladium:condition_serializer", (event) => {
  event
    .create("satsu_iron_man_addon:looking_left")

    .addProperty("range", "integer", 90, "Max angle for the looking range.")

    .test((entity, props) => {
      if (entity.isPlayer()) {
        let angle_range = props.get("range");
        let yaw = entity.getRotationVector().y;
        return yaw <= -angle_range;
      }
      return false;
    });
});
