StartupEvents.registry("palladium:abilities", (event) => {
  event
    .create("satsu_iron_man_addon:teleport")

    .icon(palladium.createItemIcon("minecraft:ender_pearl"))

    .addProperty(
      "max_distance",
      "integer",
      10,
      "Max distance that the player can teleport."
    )

    .tick((entity, entry, holder, enabled) => {
      if (enabled) {
        const max_distance = entry.getPropertyByName("max_distance");
        let username = entity.getGameProfile().getName();
        entity.runCommandSilent(
          `execute as ${username} run tp ^ ^ ^${max_distance}`
        );
      }
    });
});
// credits to fsang