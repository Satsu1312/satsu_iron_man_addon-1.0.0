// credits to jaijorlon
StartupEvents.registry("palladium:abilities", (event) => {
  event
    .create("satsu_iron_man_addon:entity_damage")
    .icon(palladium.createItemIcon("palladium:vibranium_circuit"))
    .documentationDescription("Does damage to what the executer is looking at.")
    .addProperty("damage", "float", 0.0, "The amount of damage")
    .addProperty("damage_type", "string", "minecraft:player_attack", "Damage type")
    .addProperty("effect", "string", "null", "Potion effect applied")
    .addProperty("fire_seconds", "float", 0.0, "Seconds target burns")
    .addProperty("potion_seconds", "integer", 0, "Potion duration")
    .addProperty("potion_amplifier", "integer", 0, "Potion level")
    .addProperty("hide_particles", "boolean", false, "Hide potion particles")
    .addProperty("range", "float", 0.0, "Raytrace range")
    .addProperty("at", "string", "null", "Damage location override")
    .addProperty("by", "string", "@s", "Entity doing damage")
    .addProperty("from", "string", "@s", "Entity source of damage")
    .addProperty("command_as_entity", "string", "null", "Command executed by target")
    .addProperty("excluded_tag", "string", "damage_excluded_tag", "Entities with this tag are immune")

    .tick((entity, entry, holder, enabled) => {
      if (!enabled) return;

      const damage = entry.getPropertyByName("damage");
      const damage_type = entry.getPropertyByName("damage_type");
      const effect = entry.getPropertyByName("effect");
      const fire_seconds = entry.getPropertyByName("fire_seconds");
      const potion_seconds = entry.getPropertyByName("potion_seconds");
      const potion_amplifier = entry.getPropertyByName("potion_amplifier");
      const hide_particles = entry.getPropertyByName("hide_particles");
      const range = entry.getPropertyByName("range");
      const at = entry.getPropertyByName("at");
      const by = entry.getPropertyByName("by");
      const from = entry.getPropertyByName("from");
      const command_as_entity = entry.getPropertyByName("command_as_entity");
      const excluded_tag = entry.getPropertyByName("excluded_tag");

      const target = entity.rayTrace(range).entity;
      if (!target || containsTag(target.getTags().toArray(), excluded_tag)) return;

      // Ejecutar comando opcional
      if (command_as_entity !== "null") {
        entity.runCommandSilent(`execute as ${target.uuid} at ${target.uuid} run ${command_as_entity}`);
      }

      // Construir comando de daño
      const damageCmd = at === "null"
        ? `damage ${target.uuid} ${damage} ${damage_type} by ${by} from ${from}`
        : `damage ${target.uuid} ${damage} ${damage_type} at ${at}`;
      entity.runCommandSilent(damageCmd);

      // Aplicar fuego
      if (fire_seconds > 0) target.setSecondsOnFire(fire_seconds);

      // Aplicar efecto de poción
      if (effect !== "null" && potion_seconds > 0) {
        target.potionEffects.add(
          effect,
          potion_seconds,
          potion_amplifier,
          hide_particles,   // ambient
          !hide_particles   // show particles
        );
      }
    });
});

function containsTag(tags, tag) {
  return tags.some(t => t.equals(tag));
}