StartupEvents.registry("palladium:abilities", (event) => {
  event
    .create("satsu_iron_man_addon:prevent_drop")
    .icon(palladium.createItemIcon("minecraft:stick"))
    .addProperty(
      "item",
      "string",
      "minecraft:stick",
      "The item you wish to summon when the ability is activated."
    )
    .addProperty(
      "stay",
      "boolean",
      false,
      "Whether or not you wish for the item to stay in the players inventory after the ability ends."
    );
});
