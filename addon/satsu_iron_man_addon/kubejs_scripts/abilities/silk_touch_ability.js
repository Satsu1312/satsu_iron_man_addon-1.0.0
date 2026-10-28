StartupEvents.registry("palladium:abilities", (event) => {
  event
    .create("satsu_iron_man_addon:silk_touch_ability")
    .icon(palladium.createItemIcon("minecraft:diamond_pickaxe"))
    .addProperty(
      "enabled",
      "boolean",
      true,
      "Whether the silk touch effect is currently active.",
    );
});
