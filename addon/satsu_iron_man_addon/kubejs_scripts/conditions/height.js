StartupEvents.registry("palladium:condition_serializer", (event) => {
  event
    .create("satsy_iron_man_addon:height_bool_condition")

    // Propiedades de altura mínima y máxima
    .addProperty("min_height", "integer", -64, "how low you can go")
    .addProperty("max_height", "integer", 320, "how high you can go")

    .test((entity, properties) => {
      const minHeight = properties.get("min_height");
      const maxHeight = properties.get("max_height");
      const currentY = entity.getY();

      // Comprueba que la entidad esté DENTRO del rango [minHeight, maxHeight]
      return currentY >= minHeight && currentY <= maxHeight;
    });
});
