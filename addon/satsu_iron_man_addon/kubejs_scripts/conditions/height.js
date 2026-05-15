StartupEvents.registry("palladium:condition_serializer", (event) => {
  event
    .create("satsy_iron_man_addon:height_bool_condition")

    //property
    .addProperty("max_height", "integer", 100, "how high you can go")

    .test((entity, properties) => {
      const height = properties.get("max_height");
      return entity.getY() >= height;
    });
});
