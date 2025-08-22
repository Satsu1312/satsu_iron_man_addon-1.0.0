// Firstly, register the property in the entity
PalladiumEvents.registerProperties((event) => {
  // Only register for players
  if (event.getEntityType() === "minecraft:player") {
    // Arguments: Key of the property, type of the property, default/starting value
    event.registerProperty("satsu_nano_type_of_shoot", "integer", 0);
  }
});
PalladiumEvents.registerProperties((event) => {
  // Only register for players
  if (event.getEntityType() === "minecraft:player") {
    // Arguments: Key of the property, type of the property, default/starting value
    event.registerProperty("satsu_nano_type_weapon", "integer", 0);
  }
});
PalladiumEvents.registerProperties((event) => {
  // Only register for players
  if (event.getEntityType() === "minecraft:player") {
    // Arguments: Key of the property, type of the property, default/starting value
    event.registerProperty("satsu_mask_value", "integer", 1);
  }
});
PalladiumEvents.registerProperties((event) => {
  // Only register for players
  if (event.getEntityType() === "minecraft:player") {
    // Arguments: Key of the property, type of the property, default/starting value
    event.registerProperty("satsu_armor_weapon_system", "integer", 1);
  }
});
PalladiumEvents.registerProperties((event) => {
  // Only register for players
  if (event.getEntityType() === "minecraft:player") {
    // Arguments: Key of the property, type of the property, default/starting value
    event.registerProperty("satsu_left_arm", "string", "true");
  }
});
