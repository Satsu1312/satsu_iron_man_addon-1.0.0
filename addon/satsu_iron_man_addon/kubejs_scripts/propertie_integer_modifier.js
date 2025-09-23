//Made by FSang18

StartupEvents.registry("palladium:abilities", (event) => {
  event
    .create("satsu_iron_man_addon:palladium_property_modifier")
    .icon(palladium.createItemIcon("minecraft:command_block"))
    .addProperty(
      "property_name",
      "string",
      "example_property",
      "Name of the property to modify"
    )
    .addProperty("adjustment_type", "string", "add", "add, subtract or set")
    .addProperty("adjustment_amount", "integer", 1, "Amount to adjust")

    .tick((entity, entry, holder, enabled) => {
      if (enabled && entity.isPlayer()) {
        const sbName = entry.getPropertyByName("property_name");
        const adjustType = entry.getPropertyByName("adjustment_type");
        const adjustAmt = entry.getPropertyByName("adjustment_amount");

        let currentScore = palladium.getProperty(entity, sbName);

        if (adjustType === "add") {
          palladium.setProperty(entity, sbName, currentScore + adjustAmt);
        } else if (adjustType === "subtract") {
          palladium.setProperty(entity, sbName, currentScore - adjustAmt);
        } else if (adjustType === "set") {
          palladium.setProperty(entity, sbName, adjustAmt);
        }
      }
    });
});
