// Add custom ability
StartupEvents.registry("palladium:abilities", (event) => {
  // ID of the ability will be: 'kubejs:satsu_iron_man_addon/add_power'
  event
    .create("satsu_iron_man_addon:add_power")

    // Preset icon, can also be changed individually in the power json
    .icon(palladium.createItemIcon("minecraft:bread"))

    // Documentation description
    .documentationDescription(
      "Increases a player's scoreboard by a specific amount."
    )
    .addProperty(
      "power_path",
      "string",
      "palladium",
      "Path of the power to add"
    )
    .addProperty(
      "powerid",
      "string",
      "test_power",
      "ID of the power to add"
    )
    // Handler for what happens during EVERY tick of the ability being active, make sure to check the 'enabled' parameter
    .tick((entity, entry, holder, enabled) => {
      if (enabled) {
        const power_path = entry.getPropertyByName("power_path");
        const powerid = entry.getPropertyByName("powerid");
        palladium.superpowers.addSuperpower(entity, `${power_path}:${powerid}`);
      }
    });
});
StartupEvents.registry("palladium:abilities", (event) => {
  // ID of the ability will be: 'kubejs:satsu_iron_man_addon/remove_power'
  event
    .create("satsu_iron_man_addon:remove_power")

    // Preset icon, can also be changed individually in the power json
    .icon(palladium.createItemIcon("minecraft:bread"))

    // Documentation description
    .documentationDescription(
      "Increases a player's scoreboard by a specific amount."
    )
    .addProperty(
      "power_path",
      "string",
      "palladium",
      "Path of the power to add"
    )
    .addProperty(
      "powerid",
      "string",
      "test_power",
      "ID of the power to add"
    )
    // Handler for what happens during EVERY tick of the ability being active, make sure to check the 'enabled' parameter
    .tick((entity, entry, holder, enabled) => {
      if (enabled) {
        const power_path = entry.getPropertyByName("power_path");
        const powerid = entry.getPropertyByName("powerid");
        palladium.superpowers.removeSuperpower(entity, `${power_path}:${powerid}`);
      }
    });
});