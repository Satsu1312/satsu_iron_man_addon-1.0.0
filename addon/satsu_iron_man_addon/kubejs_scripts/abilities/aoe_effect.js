StartupEvents.registry("palladium:abilities", (event) => {
  event
    .create("satsu_iron_man_addon:aoe_effect_modifier")
    .icon(palladium.createItemIcon("minecraft:potion"))
    .documentationDescription(
      "Aplica un efecto de estado en área a todas las entidades cercanas excepto al usuario.",
    )
    .addProperty(
      "effect",
      "string",
      "minecraft:slowness",
      "ID del efecto (ej. minecraft:slowness)",
    )
    .addProperty("amplifier", "integer", 0, "Nivel del efecto (0 = nivel I)")
    .addProperty("range", "double", 10.0, "Radio del área de efecto en bloques")
    .addProperty(
      "duration",
      "integer",
      40,
      "Duración del efecto en ticks (20 = 1 segundo)",
    )
    .addProperty(
      "show_particles",
      "boolean",
      true,
      "Muestra partículas de poción",
    )

    .tick((entity, entry, holder, enabled) => {
      if (!enabled || entity.level.isClientSide()) return;

      // Re-aplicamos cada 20 ticks (1 segundo) para optimizar rendimiento
      if (entity.age % 20 !== 0) return;

      const effectId = entry.getPropertyByName("effect");
      const amplifier = entry.getPropertyByName("amplifier") || 0;
      const range = entry.getPropertyByName("range") || 5.0;
      const duration = entry.getPropertyByName("duration") || 40;
      const showParticles = entry.getPropertyByName("show_particles") === true;

      // Definir la caja de búsqueda (AABB) alrededor del jugador ejecutor
      const boundingBox = entity.boundingBox.inflate(range, range, range);

      // Obtener todas las entidades vivas dentro del área
      const targets = entity.level.getEntitiesWithin(boundingBox);

      targets.forEach((target) => {
        // Excluir al usuario y asegurar que la entidad sea un ser vivo (LivingEntity)
        if (target.uuid !== entity.uuid && target.isLiving()) {
          target.potionEffects.add(
            effectId,
            duration,
            amplifier,
            false,
            showParticles,
          );
        }
      });
    });
});
