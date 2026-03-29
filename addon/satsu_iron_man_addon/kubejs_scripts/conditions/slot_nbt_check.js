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

      // Obtener ítem directamente del slot
      const item = entity.getItemBySlot(slotName);
      if (!item || item.isEmpty() || !item.nbt) return false;

      // Comparar valor NBT
      return item.nbt[nbtKey] === nbtValue;
    });
});
