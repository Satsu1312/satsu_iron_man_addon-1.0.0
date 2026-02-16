StartupEvents.registry("palladium:abilities", (event) => {
  event
    .create("satsu_iron_man_addon:effect_immunity")
    .icon(palladium.createItemIcon("minecraft:diamond"))
    .addProperty(
      "effect",
      "string",
      "minecraft:poison",
      "The effect the entity is immune to"
    )
    .addProperty(
      "command",
      "string",
      "",
      "The command to run when the entity is given the effect"
    )
    .tick((entity, entry, holder, enabled) => {
      const command = entry.getPropertyByName("command");
      const effect = entry.getPropertyByName("effect");
      if (enabled) {
        if (entity.hasEffect(effect)) {
          entity.removeEffect(effect);
          entity.runCommandSilent(command);
        }
      }
    });
});
