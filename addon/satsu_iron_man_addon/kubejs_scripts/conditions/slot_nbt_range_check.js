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

      const item = entity.getItemBySlot(slotName);
      if (!item || item.isEmpty() || !item.nbt) return false;

      const value = Number(item.nbt[nbtKey]);
      if (isNaN(value)) return false;

      return value >= min && value <= max;
    });
});
