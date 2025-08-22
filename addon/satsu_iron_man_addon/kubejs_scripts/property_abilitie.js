// Add custom ability
StartupEvents.registry("palladium:abilities", (event) => {
  // ID of the ability will be: 'kubejs:satsu_iron_man_addon/add_power'
  event
    .create("satsu_iron_man_addon:set_property")

    // Preset icon, can also be changed individually in the power json
    .icon(palladium.createItemIcon("minecraft:bread"))

    // Documentation description
    .documentationDescription(
      "Add,set or remove a specific power to the player when the ability is active."
    )
    .addProperty(
      "name",
      "string",
      "satsu_nano_weapons",
      "Name of the Custom property, you need them in assets and addon folder"
    )
    .addProperty("number", "integer", 1, "number of the amount in the property")
    // Handler for what happens during EVERY tick of the ability being active, make sure to check the 'enabled' parameter
    .tick((entity, entry, holder, enabled) => {
      if (enabled) {
        const name = entry.getPropertyByName("name");
        const number = entry.getPropertyByName("number");
        palladium.setProperty(entity, name, number);
      }
    });
});
StartupEvents.registry("palladium:abilities", (event) => {
  // ID of the ability will be: 'kubejs:satsu_iron_man_addon/add_power'
  event
    .create("satsu_iron_man_addon:set_property_string")

    // Preset icon, can also be changed individually in the power json
    .icon(palladium.createItemIcon("minecraft:bread"))

    // Documentation description
    .documentationDescription(
      "Add,set or remove a specific power to the player when the ability is active."
    )
    .addProperty(
      "name",
      "string",
      "satsu_nano_weapons",
      "Name of the Custom property, you need them in assets and addon folder"
    )
    .addProperty(
      "test",
      "string",
      "set_value",
      "set false or true"
    )
    // Handler for what happens during EVERY tick of the ability being active, make sure to check the 'enabled' parameter
    .tick((entity, entry, holder, enabled) => {
      if (enabled) {
        const name = entry.getPropertyByName("name");
        const test = entry.getPropertyByName("test");
        palladium.setProperty(entity, name, test);
      }
    });
});
StartupEvents.registry("palladium:abilities", (event) => {
  // ID of the ability will be: 'kubejs:satsu_iron_man_addon/add_power'
  event
    .create("satsu_iron_man_addon:add_property")

    // Preset icon, can also be changed individually in the power json
    .icon(palladium.createItemIcon("minecraft:bread"))

    // Documentation description
    .documentationDescription(
      "Add,set or remove a specific power to the player when the ability is active."
    )
    .addProperty(
      "name",
      "string",
      "satsu_nano_weapons",
      "Name of the Custom property, you need them in assets and addon folder"
    )
    .addProperty("number", "integer", 1, "number of the amount in the property")
    // Handler for what happens during EVERY tick of the ability being active, make sure to check the 'enabled' parameter
    .tick((entity, entry, holder, enabled) => {
      if (enabled) {
        const name = entry.getPropertyByName("name");
        const number = entry.getPropertyByName("number");
        palladium.getProperty(entity, name, number + parseInt("number"));
      }
    });
});
StartupEvents.registry("palladium:abilities", (event) => {
  // ID of the ability will be: 'kubejs:satsu_iron_man_addon/add_power'
  event
    .create("satsu_iron_man_addon:set_property_first_tick")

    // Preset icon, can also be changed individually in the power json
    .icon(palladium.createItemIcon("minecraft:bread"))

    // Documentation description
    .documentationDescription(
      "Add,set or remove a specific power to the player when the ability is active."
    )
    .addProperty(
      "name",
      "string",
      "satsu_nano_weapons",
      "Name of the Custom property, you need them in assets and addon folder"
    )
    .addProperty("number", "integer", 1, "number of the amount in the property")
    // Handler for what happens during EVERY tick of the ability being active, make sure to check the 'enabled' parameter
    .firstTick((entity, entry, holder, enabled) => {
      if (enabled) {
        const name = entry.getPropertyByName("name");
        const number = entry.getPropertyByName("number");
        palladium.setProperty(entity, name, number);
      }
    });
});
