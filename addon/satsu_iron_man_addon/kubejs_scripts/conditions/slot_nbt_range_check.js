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
          item = entity.getItemBySlot("feet"); // funciona en Armor Stand y jugador
          break;
        case "legs":
          item = entity.getItemBySlot("legs");
          break;
        case "chest":
          item = entity.getItemBySlot("chest");
          break;
        case "head":
          item = entity.getItemBySlot("head");
          break;
        default:
          return false;
      }

      if (!item || item.isEmpty() || !item.hasNBT()) return false;

      const nbt = item.getNbt();
      if (!nbt || !nbt.contains(nbtKey)) return false;

      const value = nbt.getInt(nbtKey);
      return value >= min && value <= max;
    });
});
