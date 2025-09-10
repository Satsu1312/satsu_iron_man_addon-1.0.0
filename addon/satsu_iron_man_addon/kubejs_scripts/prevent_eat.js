StartupEvents.registry("palladium:abilities", (event) => {
  event
    .create("satsu_iron_man_addon:prevent_eat")
    .icon(palladium.createItemIcon("minecraft:apple"))

    .addProperty(
      "item",
      "resource_location",
      "minecraft:apple",
      "The item that is prevented from dropping"
    )
    .addProperty(
      "tag",
      "resource_location",
      "null",
      "The item tag that is prevented from dropping"
    );

  // no functionality here because it's all in the server script
});
