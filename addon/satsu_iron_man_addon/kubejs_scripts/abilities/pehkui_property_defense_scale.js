StartupEvents.registry("palladium:abilities", (event) => {
  event
    .create("satsu_iron_man_addon:pehkui_property_defense_scale")
    .icon(palladium.createItemIcon("pehkui:gold_shield"))
    .documentationDescription(
      "Modifica la escala de defensa de Pehkui basándose en una propiedad de Palladium."
    )
    .addProperty(
      "property_value",
      "string",
      "satsu_iron_man_addon_scale_defense", // <-- Propiedad por defecto recomendada para defensa
      "Name of the Palladium property to use for value"
    )
    .addProperty(
      "Division_Amount",
      "float",
      1.0,
      "The amount the property value will be divided by"
    )

    .tick((entity, entry, holder, enabled) => {
      if (!enabled || !entity.isPlayer()) return;

      // Lectura limpia usando el formato estándar de tu script funcional
      const division = entry.getPropertyByName("Division_Amount");
      const palladiumProperty = entry.getPropertyByName("property_value");
      
      let propertyValue = palladium.getProperty(entity, palladiumProperty);

      if (propertyValue != null && division !== 0) {
        let finalScale = propertyValue / division;

        const scaleData = ScaleTypes.DEFENSE.getScaleData(entity);
        if (scaleData) {
          scaleData.setTargetScale(finalScale);
        }
      }
    })

    .lastTick((entity, entry, holder, enabled) => {
      if (!entity.isPlayer()) return;

      // Al desactivarse, restablece la escala de defensa a la normalidad (1.0)
      const scaleData = ScaleTypes.DEFENSE.getScaleData(entity);
      if (scaleData) {
        scaleData.setTargetScale(1.0);
      }
    });
});