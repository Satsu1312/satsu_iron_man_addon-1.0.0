// Archivo: kubejs/startup_scripts/palladium_condition_range.js

StartupEvents.registry("palladium:condition_serializer", (event) => {
  event
    .create("satsu_iron_man_addon:slot_nbt_range_check")
    .addProperty(
      "slot",
      "string",
      "mainhand",
      "Slot to check (mainhand, offhand, boots, leggings, chestplate, helmet)",
    )
    .addProperty("nbtKey", "string", "skillCharge", "The NBT key to check")
    .addProperty("min", "integer", 0, "Minimum allowed value")
    .addProperty("max", "integer", 2147483647, "Maximum allowed value")
    .test((entity, props) => {
      const slotName = props.get("slot");
      const nbtKey = props.get("nbtKey");
      const min = props.get("min");
      const max = props.get("max");

      let item = null;

      switch (slotName) {
        case "mainhand":
          item = entity.getMainHandItem();
          break;
        case "offhand":
          item = entity.getOffHandItem();
          break;
        case "feet":
          item = entity.inventory.getArmor(0);
          break;
        case "legs":
          item = entity.inventory.getArmor(1);
          break;
        case "chest":
          item = entity.inventory.getArmor(2);
          break;
        case "head":
          item = entity.inventory.getArmor(3);
          break;
        default:
          return false;
      }


      if (!item || item.isEmpty() || !item.hasNBT()) return false;

      const nbt = item.getNbt();
      if (!nbt || !nbt.contains(nbtKey)) return false;

      // Leer valor como entero
      const value = nbt.getInt(nbtKey);

      // Verificar si está dentro del rango
      return value >= min && value <= max;
    });
});
