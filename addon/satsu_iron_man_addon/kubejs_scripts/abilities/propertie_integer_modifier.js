// Made by FSang18 (optimizado)

StartupEvents.registry("palladium:abilities", (event) => {
  event
    .create("satsu_iron_man_addon:palladium_property_modifier")
    .icon(palladium.createItemIcon("minecraft:command_block"))
    .documentationDescription("Modify a Palladium property by add, subtract or set.")
    .addProperty("property_name", "string", "example_property", "Name of the property to modify")
    .addProperty("adjustment_type", "string", "add", "add, subtract or set")
    .addProperty("adjustment_amount", "integer", 1, "Amount to adjust")

    .tick((entity, entry, holder, enabled) => {
      if (!enabled || !entity.isPlayer()) return;

      const propName = entry.getPropertyByName("property_name");
      const adjustType = entry.getPropertyByName("adjustment_type");
      const adjustAmt = entry.getPropertyByName("adjustment_amount");
      const current = palladium.getProperty(entity, propName);

      const actions = {
        add: () => palladium.setProperty(entity, propName, current + adjustAmt),
        subtract: () => palladium.setProperty(entity, propName, current - adjustAmt),
        set: () => palladium.setProperty(entity, propName, adjustAmt),
      };

      if (actions[adjustType]) {
        actions[adjustType]();
      }
    });
});