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
    .tick((entity, entry, holder, enabled) => {
      if (!enabled) return;

      const effect = entry.getPropertyByName("effect");
      if (entity.hasEffect(effect)) {
        entity.removeEffect(effect);
      }
    });
});