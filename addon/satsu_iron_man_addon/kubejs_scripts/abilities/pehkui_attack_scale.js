const ScaleTypes = Java.loadClass("virtuoel.pehkui.api.ScaleTypes");

StartupEvents.registry("palladium:abilities", (event) => {
  event
    .create("satsu_iron_man_addon:pehkui_property_scale")
    .icon(palladium.createItemIcon("pehkui:gold_sword"))
    .documentationDescription(
      "Modifica la escala de ataque de Pehkui basándose en una propiedad de Palladium."
    )
    .addProperty(
      "property_value",
      "string",
      "Palladium.Property",
      "Name of the Palladium property to use for value"
    )
    .addProperty(
      "Division_Amount",
      "string",
      "1",
      "The amount the property value will be divided by"
    )

    .tick((entity, entry, holder, enabled) => {
      if (!enabled || !entity.isPlayer()) return;

      const divisionStr = entry.getPropertyByName("Division_Amount");
      const division = parseFloat(divisionStr) || 1.0;

      let palladiumProperty = entry.getPropertyByName("property_value");
      let propertyValue = palladium.getProperty(entity, palladiumProperty);

      if (propertyValue != null) {
        let finalScale = parseFloat(propertyValue) / division;

        const scaleData = ScaleTypes.ATTACK.getScaleData(entity);
        if (scaleData) {
          scaleData.setTargetScale(finalScale);
        }
      }
    })

    .lastTick((entity, entry, holder, enabled) => {
      if (!entity.isPlayer()) return;

      // Al desactivarse la habilidad, restablecemos la escala a su valor normal (1.0)
      const scaleData = ScaleTypes.ATTACK.getScaleData(entity);
      if (scaleData) {
        scaleData.setTargetScale(1.0);
      }
    });
});