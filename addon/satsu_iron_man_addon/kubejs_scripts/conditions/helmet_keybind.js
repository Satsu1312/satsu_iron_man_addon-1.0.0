StartupEvents.registry("palladium:condition_serializer", (event) => {
  event
    .create("satsu_iron_man_addon:open_equipment_condition")
    .test((entity, properties) => {
      return entity.persistentData.getBoolean("satsu_iron_man_addon.open_equipment_pressed");
    });
});