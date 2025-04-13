// Add custom ability
StartupEvents.registry('palladium:abilities', (event) => {
  // ID of the ability will be: 'satsu_iron_man_addon:ad_astra_breath'
  event
    .create('satsu_iron_man_addon:ad_astra_breath')

    // Preset icon, can also be changed individually in the power json
    .icon(palladium.createItemIcon('minecraft:bread'))

    // Documentation description
    .documentationDescription(
      'This is a test ability, defined in a KubeJS script.'
    )

    // Handler for what happens during the FIRST tick of the ability being active
    .firstTick((entity, entry, holder, enabled) => {
      entity.tell('');
    })

    // Handler for what happens during EVERY tick of the ability being active, make sure to check the 'enabled' parameter
    .tick((entity, entry, holder, enabled) => {
      if (enabled) {
        entity.setTicksFrozen(0);
      }
    });
});
