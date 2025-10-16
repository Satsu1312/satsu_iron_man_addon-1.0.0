StartupEvents.registry("palladium:abilities", (event) => {
  event
    .create("satsu_iron_man_addon:mastery_prop")
    .addProperty(
      "mastery",
      "string",
      "posthuman.flameMastery",
      "the name of the mastery property"
    )
    .addProperty(
      "level",
      "string",
      "posthuman.flameLevel",
      "the name of the level property"
    )
    .addProperty(
      "max",
      "string",
      "posthuman.flameMax",
      "the name of the max property"
    )
    .addProperty(
      "amount",
      "integer",
      100,
      "amount to add for the first level increase"
    )
    .addProperty(
      "modifier",
      "float",
      1.5,
      "multiplier for each subsequent level"
    )
    .addProperty("max_level", "integer", 100, "the maximum level attainable")
    .addProperty(
      "colour",
      "integer",
      6,
      "the colour of the level up message. Refer to Minecraft formatting codes"
    )
    .tick((entity, entry, holder, enabled) => {
      if (enabled && entity.isPlayer()) {
        const mastery = entry.getPropertyByName("mastery");
        const level = entry.getPropertyByName("level");
        const max = entry.getPropertyByName("max");
        let amount = entry.getPropertyByName("amount");
        let modifier = entry.getPropertyByName("modifier");
        let max_level = entry.getPropertyByName("max_level");
        let currentLevel = palladium.getProperty(entity, level);
        let currentMax = palladium.getProperty(entity, max);
        let currentMastery = palladium.getProperty(entity, mastery);
        let colour = entry.getPropertyByName("colour");
        if (currentLevel < max_level && currentMastery >= currentMax) {
          palladium.setProperty(entity, level, currentLevel + 1);
          palladium.setProperty(entity, mastery, currentMastery - currentMax);
          palladium.setProperty(
            entity,
            max,
            currentMax + modifier * amount * currentLevel
          );
          let newLevel = palladium.getProperty(entity, level);
          let masteryTextInitial = mastery.replace("posthuman.", "");
          let masteryTextSecond = masteryTextInitial.replace("Mastery", "");
          let masteryText = `${masteryTextSecond
            .slice(0, 1)
            .toUpperCase()}${masteryTextSecond.slice(1)}`;
          entity.setStatusMessage(
            "§" +
              colour +
              "Your " +
              masteryText +
              " Mastery has increased to level " +
              newLevel +
              "!"
          );
        } else return;
      }
    });
}); // Made by ShadowLegacy557
// Thanks to Codecreality for line 27
// Thanks to Lucas Lucraft for line 28
