/*
  @author Hertz
  @version 2.1
*/

const BuiltInRegistries = Java.loadClass(
  "net.minecraft.core.registries.BuiltInRegistries"
);

function resolveAllegedBooleanFromObject(thing) {
  const str = thing?.toString();
  if (str === "true") return true;
  if (str === "false") return false;
  return null;
}

StartupEvents.registry("palladium:condition_serializer", (event) => {
  event
    .create("satsu_iron_man_addon:dampened_by")
    .addProperty("effect", "string", "minecraft:health_boost", "Effect to search for")
    .test((entity, props) => {
      if (!props) return false;

      const targetEffect = props.get("effect");
      const fetchedEffect = BuiltInRegistries.MOB_EFFECT.get(targetEffect);

      // Si el efecto no existe → condición no válida
      if (!fetchedEffect) return true;

      // Si el entity tiene el efecto → condición fallida
      return !entity.hasEffect(targetEffect);
    });
});