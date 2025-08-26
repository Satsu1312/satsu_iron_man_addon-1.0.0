PalladiumEvents.registerProperties((event) => {
  // Only register for players
  if (event.getEntityType() === "minecraft:player") {
    // Arguments: Key of the property, type of the property, default/starting value
    event.registerProperty("satsu_ia_wheel.night_vision", "string", "true");
  }
});
PalladiumEvents.registerProperties((event) => {
  // Only register for players
  if (event.getEntityType() === "minecraft:player") {
    // Arguments: Key of the property, type of the property, default/starting value
    event.registerProperty("satsu_ia_wheel.scan", "string", "false");
  }
});
PalladiumEvents.registerProperties((event) => {
  // Only register for players
  if (event.getEntityType() === "minecraft:player") {
    // Arguments: Key of the property, type of the property, default/starting value
    event.registerProperty("satsu_ia_wheel.cook", "string", "false");
  }
});
