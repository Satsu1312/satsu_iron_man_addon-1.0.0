// Add custom ability
StartupEvents.registry("palladium:abilities", (event) => {
  // ID of the ability will be: 'kubejs:satsu_iron_man_addon/increase_scoreboard'
  event
    .create("satsu_iron_man_addon:increase_scoreboard")

    // Preset icon, can also be changed individually in the power json
    .icon(palladium.createItemIcon("minecraft:bread"))

    // Documentation description
    .documentationDescription(
      "Increases a player's scoreboard by a specific amount."
    )
    .addProperty(
      "scoreboard_name",
      "string",
      "test.score.board",
      "Name of the scoreboard to modify"
    )
    .addProperty(
      "quantity",
      "integer",
      1,
      "quantity to add to the scoreboard"
    )
    // Handler for what happens during EVERY tick of the ability being active, make sure to check the 'enabled' parameter
    .tick((entity, entry, holder, enabled) => {
      if (enabled) {
        const scoreboard_name = entry.getPropertyByName("scoreboard_name");
        const quantity = entry.getPropertyByName("quantity");
        palladium.scoreboard.addScore(entity, scoreboard_name, quantity);
      }
    });
});
StartupEvents.registry("palladium:abilities", (event) => {
  // ID of the ability will be: 'kubejs:satsu_iron_man_addon/decrease_scoreboard'
  event
    .create("satsu_iron_man_addon:decrease_scoreboard")

    // Preset icon, can also be changed individually in the power json
    .icon(palladium.createItemIcon("minecraft:bread"))

    // Documentation description
    .documentationDescription(
      "Decreases a player's scoreboard by a specific amount."
    )
    .addProperty(
      "scoreboard_name",
      "string",
      "test.score.board",
      "Name of the scoreboard to modify"
    )
    .addProperty(
      "quantity",
      "integer",
      1,
      "quantity to remove to the scoreboard"
    )
    // Handler for what happens during EVERY tick of the ability being active, make sure to check the 'enabled' parameter
    .tick((entity, entry, holder, enabled) => {
      if (enabled) {
        const scoreboard_name = entry.getPropertyByName("scoreboard_name");
        const quantity = entry.getPropertyByName("quantity");
        palladium.scoreboard.subtractScore(entity, scoreboard_name, quantity);
      }
    });
});

StartupEvents.registry("palladium:abilities", (event) => {
  // ID of the ability will be: 'kubejs:satsu_iron_man_addon/set_scoreboard'
  event
    .create("satsu_iron_man_addon:set_scoreboard")

    // Preset icon, can also be changed individually in the power json
    .icon(palladium.createItemIcon("minecraft:bread"))

    // Documentation description
    .documentationDescription(
      "sets a player's scoreboard by a specific amount."
    )
    .addProperty(
      "scoreboard_name",
      "string",
      "test.score.board",
      "Name of the scoreboard to modify"
    )
    .addProperty(
      "quantity",
      "integer",
      1,
      "quantity to set to the scoreboard"
    )
    // Handler for what happens during EVERY tick of the ability being active, make sure to check the 'enabled' parameter
    .tick((entity, entry, holder, enabled) => {
      if (enabled) {
        const scoreboard_name = entry.getPropertyByName("scoreboard_name");
        const quantity = entry.getPropertyByName("quantity");
        palladium.scoreboard.setScore(entity, scoreboard_name, quantity);
      }
    });
});
