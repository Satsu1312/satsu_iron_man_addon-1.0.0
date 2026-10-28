StartupEvents.registry("palladium:condition_serializer", (event) => {
  event.create("satsy_iron_man_addon:height_bool_condition")
    // Propiedades de altura mínima y máxima
    .addProperty("min_height", "integer", -64, "Altura mínima permitida")
    .addProperty("max_height", "integer", 320, "Altura máxima permitida")
    .test((entity, properties) => {
      // Protección de seguridad: evita crasheos si la entidad no existe temporalmente
      if (!entity) return false;

      const currentY = entity.getY();
      
      // Comprobación directa del rango [minHeight, maxHeight]
      return currentY >= properties.get("min_height") && 
             currentY <= properties.get("max_height");
    });
});