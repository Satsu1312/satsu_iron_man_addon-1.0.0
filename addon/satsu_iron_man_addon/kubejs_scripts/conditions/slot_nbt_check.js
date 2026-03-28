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
      if (!item || item.isEmpty() || !item.nbt) return false;

      // Acceso directo al objeto NBT expuesto por KubeJS
      return item.nbt[nbtKey] === nbtValue;
    });
});
