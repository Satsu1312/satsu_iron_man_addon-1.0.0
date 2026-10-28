StartupEvents.registry("palladium:abilities", (event) => {
  event
    .create("satsu_iron_man_addon:multi_effect_modifier")
    .icon(palladium.createItemIcon("minecraft:potion"))
    .documentationDescription(
      "Apply multiple status effects to the player when active.",
    )
    .addProperty(
      "effects",
      "string_array",
      [],
      "List of effect IDs (e.g. minecraft:speed)",
    )
    .addProperty(
      "amplifiers",
      "string_array",
      [],
      "List of amplifiers (0 = level 1)",
    )
    .addProperty(
      "show_particles",
      "string_array",
      [],
      "true or false for particles",
    )
    .addProperty("dummy", "string", "0", "Does nothing, order alignment only")

    .tick((entity, entry, holder, enabled) => {
      if (!enabled || !entity.isPlayer()) return;

      // Re-aplicamos el efecto cada 20 ticks (1 segundo) para evitar lag
      if (entity.age % 20 !== 0) return;

      const toArray = (prop) => (prop ? Array.from(prop) : []);
      const effects = toArray(entry.getPropertyByName("effects"));
      const amplifiers = toArray(entry.getPropertyByName("amplifiers"));
      const showParticles = toArray(entry.getPropertyByName("show_particles"));

      if (effects.length !== amplifiers.length) {
        holder.setEnabled(false);
        return;
      }

      effects.forEach((effectId, i) => {
        const amplifier = parseInt(amplifiers[i]) || 0;
        const particles = showParticles[i] === "true";

        // Aplica el efecto durante 40 ticks
        entity.potionEffects.add(effectId, 40, amplifier, false, particles);
      });
    })

    .lastTick((entity, entry) => {
      if (!entity.isPlayer()) return;

      const toArray = (prop) => (prop ? Array.from(prop) : []);
      const effects = toArray(entry.getPropertyByName("effects"));

      // CORRECCIÓN AQUÍ: Usamos entity.removeEffect(effectId) en lugar de potionEffects.remove()
      effects.forEach((effectId) => {
        entity.removeEffect(effectId);
      });
    });
});
