// Archivo: kubejs/startup_scripts/palladium_condition_slot_nbt_check.js

StartupEvents.registry("palladium:condition_serializer", (event) => {
  event
    .create("satsu_iron_man_addon:slot_nbt_check")
    .addProperty(
      "slot",
      "string",
      "mainhand",
      "Slot to check (mainhand, offhand, boots, leggings, chestplate, helmet)",
    )
    .addProperty("nbtKey", "string", "CustomTag", "The NBT key to check")
    .addProperty("nbtValue", "string", "Active", "The required NBT value")
    .test((entity, props) => {
      const slotName = props.get("slot");
      const nbtKey = props.get("nbtKey");
      const nbtValue = props.get("nbtValue");

      let item = null;

      // --- Slots vanilla (compatibles con armor stands) ---
      switch (slotName) {
        case "mainhand":
          item = entity.getMainHandItem();
          break;
        case "offhand":
          item = entity.getOffHandItem();
          break;
        case "feet":
          item = entity.getItemBySlot("feet");
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

      return nbt.getString(nbtKey) === nbtValue;
    });
});
