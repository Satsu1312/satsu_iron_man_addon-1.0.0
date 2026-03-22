/*
  @author Hertz
  @version 2.2
*/

const BuiltInRegistries = Java.loadClass("net.minecraft.core.registries.BuiltInRegistries");

StartupEvents.registry("palladium:condition_serializer", (event) => {
  event
    .create("satsu_iron_man_addon:dampened_by")
    .addProperty("effect", "string", "minecraft:health_boost", "Effect to search for")
    .test((entity, props) => {
      if (!props) return false;

      const effectId = props.get("effect");
      const effect = BuiltInRegistries.MOB_EFFECT.get(effectId);

      // Si el efecto no existe → condición válida (no bloquea)
      if (!effect) return true;

      // Condición válida solo si el entity NO tiene el efecto
      return !entity.hasEffect(effectId);
    });
});