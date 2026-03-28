// Archivo: kubejs/startup_scripts/palladium_condition_slot_nbt_range_check.js

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

      // Mapear slots a funciones
      const slotMap = {
        mainhand: () => entity.getMainHandItem(),
        offhand: () => entity.getOffHandItem(),
        feet: () => entity.getItemBySlot("feet"),
        legs: () => entity.getItemBySlot("legs"),
        chest: () => entity.getItemBySlot("chest"),
        head: () => entity.getItemBySlot("head"),
      };

      const getItem = slotMap[slotName];
      if (!getItem) return false;

      const item = getItem();
      if (!item || item.isEmpty() || !item.hasNBT()) return false;

      const nbt = item.getNbt();
      if (!nbt?.contains(nbtKey)) return false;

      const value = nbt.getInt(nbtKey);
      return value >= min && value <= max;
    });
});
