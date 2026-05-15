// Add custom ability
StartupEvents.registry("palladium:abilities", (event) => {
  // ID of the ability will be: 'kubejs:satsu_iron_man_addon/add_power_per_tick'
  event
    .create("satsu_iron_man_addon:add_power_per_tick")

    // Preset icon, can also be changed individually in the power json
    .icon(palladium.createItemIcon("minecraft:bread"))

    // Documentation description
    .documentationDescription(
      "Add a specific power to the player when the ability is active and remove it when the ability is no longer active"
    )
    .addProperty(
      "power",
      "string",
      "palladium",
      "power to add it and remove it later"
    )
    // Handler for what happens during EVERY tick of the ability being active, make sure to check the 'enabled' parameter
    .firstTick((entity, entry, holder, enabled) => {
      if (enabled) {
        const power = entry.getPropertyByName("power");
        palladium.superpowers.addSuperpower(entity, `${power}`);
      }
    })

        // Handler for what happens during the LAST tick of the ability being active
        .lastTick((entity, entry, holder, enabled) => {
      if (enabled) {
        const power = entry.getPropertyByName("power");
        palladium.superpowers.removeSuperpower(entity, `${power}`);
      }
        });
});
StartupEvents.registry("palladium:abilities", (event) => {
  event
    .create("satsu_iron_man_addon:superpower")
    .icon(palladium.createItemIcon("minecraft:bread"))
    .documentationDescription(
      "Add, set or remove a specific power to the player when the ability is active."
    )
    .addProperty("power", "string", "test:example_power", "Power ID")
    .addProperty("capacity", "string", "add", "set, add or remove")
    .tick((entity, entry, holder, enabled) => {
      if (!enabled) return;

      const power = entry.getPropertyByName("power");
      const capacity = entry.getPropertyByName("capacity");

      const actions = {
        add: () => palladium.superpowers.addSuperpower(entity, power),
        remove: () => palladium.superpowers.removeSuperpower(entity, power),
        set: () => palladium.superpowers.setSuperpower(entity, power),
      };

      if (actions[capacity]) actions[capacity]();
    });
});