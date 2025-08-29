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
    event.registerProperty("satsu_armor_weapon_system", "string", "on");
  }
});
PalladiumEvents.registerProperties((event) => {
  // Only register for players
  if (event.getEntityType() === "minecraft:player") {
    // Arguments: Key of the property, type of the property, default/starting value
    event.registerProperty("satsu_armor_weapon", "integer", 1);
  }
});
PalladiumEvents.registerProperties((event) => {
  // Only register for players
  if (event.getEntityType() === "minecraft:player") {
    // Arguments: Key of the property, type of the property, default/starting value
    event.registerProperty("satsu_left_arm", "string", "true");
  }
});
PalladiumEvents.registerProperties((event) => {
  // Only register for players
  if (event.getEntityType() === "minecraft:player") {
    // Arguments: Key of the property, type of the property, default/starting value
    event.registerProperty("satsu_iron_man_armor_hud_enabled", "string", "false");
  }
});
PalladiumEvents.registerProperties((event) => {
  // Only register for players
  if (event.getEntityType() === "minecraft:player") {
    // Arguments: Key of the property, type of the property, default/starting value
    event.registerProperty("satsu_iron_man_armor_hud_perspective", "string", "first_person");
  }
});
PalladiumEvents.registerProperties((event) => {
  // Only register for players
  if (event.getEntityType() === "minecraft:player") {
    // Arguments: Key of the property, type of the property, default/starting value
    event.registerProperty("satsu_iron_man_addon_nano_stabilizer", "string", "false");
  }
});
PalladiumEvents.registerProperties((event) => {
  // Only register for players
  if (event.getEntityType() === "minecraft:player") {
    // Arguments: Key of the property, type of the property, default/starting value
    event.registerProperty("satsu_iron_man_addon_repulser", "string", "repulser");
  }
});
PalladiumEvents.registerProperties((event) => {
  // Only register for players
  if (event.getEntityType() === "minecraft:player") {
    // Arguments: Key of the property, type of the property, default/starting value
    event.registerProperty("satsu_iron_man_addon_reroute_flight", "string", "false");
  }
});
PalladiumEvents.registerProperties((event) => {
  // Only register for players
  if (event.getEntityType() === "minecraft:player") {
    // Arguments: Key of the property, type of the property, default/starting value
    event.registerProperty("satsu_iron_man_addon_enable_night_vision", "string", "false");
  }
});
PalladiumEvents.registerProperties((event) => {
  // Only register for players
  if (event.getEntityType() === "minecraft:player") {
    // Arguments: Key of the property, type of the property, default/starting value
    event.registerProperty("satsu_iron_man_addon_enable_scan", "string", "false");
  }
});

PalladiumEvents.registerProperties((event) => {
  // Only register for players
  if (event.getEntityType() === "minecraft:player") {
    // Arguments: Key of the property, type of the property, default/starting value
    event.registerProperty("satsu_iron_man_addon_trail", "string", "true");
  }
});
