//Made by Bosatron04
StartupEvents.registry("palladium:abilities", (event) => {
  event
    .create("satsu_iron_man_addon:scoreboard_ability")
    .icon(palladium.createItemIcon("minecraft:blaze_rod"))
    .addProperty(
      "score",
      "string",
      "example_score",
      "Name of the scoreboard to modify"
    )
    .addProperty("adjustment_type", "string", "add", "add, subtract or set")
    .addProperty(
      "adjustment_amount",
      "integer",
      1,
      "The amount you want to adjust the score by"
    )
    .tick((entity, entry, holder, enabled) => {
      if (enabled && entity.isPlayer()) {
        let scoreName = entry.getPropertyByName("score");
        let adjustmentType = entry.getPropertyByName("adjustment_type");
        let adjustmentAmount = entry.getPropertyByName("adjustment_amount");
        if (adjustmentType === "add") {
          palladium.scoreboard.addScore(entity, scoreName, adjustmentAmount);
        } else if (adjustmentType === "subtract") {
          palladium.scoreboard.subtractScore(
            entity,
            scoreName,
            adjustmentAmount
          );
        } else if (adjustmentType === "set") {
          palladium.scoreboard.setScore(entity, scoreName, adjustmentAmount);
        }
      }
    });
});
