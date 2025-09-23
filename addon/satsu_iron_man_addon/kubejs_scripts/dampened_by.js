/*
    @author Hertz
    @version 2.0
*/

var BuiltInRegistries = Java.loadClass(
  "net.minecraft.core.registries.BuiltInRegistries"
);

function resolveAllegedBooleanFromObject(thing) {
  if (thing.toString() == "true") {
    return true;
  }
  if (thing.toString() == "false") {
    return false;
  }
  return null;
}

StartupEvents.registry("palladium:condition_serializer", (event) => {
  event
    .create("satsu_iron_man_addon:dampened_by")
    .addProperty(
      "effect",
      "string",
      "minecraft:health_boost",
      "Effect to search for"
    )
    .test((entity, props) => {
      let targetEffect = props.get("effect");
      var toReturn = false;

      try {
        var fetchedEffect = BuiltInRegistries.MOB_EFFECT.get(targetEffect);
        if (fetchedEffect == null) {
          // throw new Error(`Target effect ${targetEffect} not found!`)
          toReturn = false;
        } else {
          toReturn = entity.hasEffect(targetEffect);
        }
      } catch (err) {
        console.log(err);
      }

      return !toReturn;
    });
});
