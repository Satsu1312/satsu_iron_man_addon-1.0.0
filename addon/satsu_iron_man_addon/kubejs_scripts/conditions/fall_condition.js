//Made by Codecreality
StartupEvents.registry("palladium:condition_serializer", (event) => {
  event
    .create("satsu_iron_man_addon:is_falling")
    .addProperty("distance", "integer", 1, "distance of the blocks falling")
    .test((entity, properties) => {
      let blocks = properties.get("distance");
      if (entity.fallDistance > blocks) {
        return true;
      } else {
        return false;
      }
    });
});
