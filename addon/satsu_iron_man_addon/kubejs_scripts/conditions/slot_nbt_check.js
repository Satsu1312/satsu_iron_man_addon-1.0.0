StartupEvents.registry("palladium:condition_serializer", (event) => {
  event
    .create("satsu_iron_man_addon:slot_nbt_check")
    .addProperty("slot", "string", "mainhand", "Slot to check (mainhand, offhand, boots, leggings, chestplate, helmet)")
    .addProperty("nbtKey", "string", "CustomTag", "The NBT key to check")
    .addProperty("nbtValue", "string", "Active", "The required NBT value")
    .test((entity, props) => {
      const slotName = props.get("slot");
      const nbtKey = props.get("nbtKey");
      const nbtValue = props.get("nbtValue");

      let item = null;

      // Mapear slotName a la API correcta
      switch (slotName) {
        case "mainhand":
          item = entity.mainHandItem;
          break;
        case "offhand":
          item = entity.offHandItem;
          break;
        case "boots":
          item = entity.getArmor(0);
          break;
        case "leggings":
          item = entity.getArmor(1);
          break;
        case "chestplate":
          item = entity.getArmor(2);
          break;
        case "helmet":
          item = entity.getArmor(3);
          break;
        default:
          return false;
      }

      if (!item || item.isEmpty() || !item.hasNBT()) return false;

      const itemNBT = item.nbt;
      if (!itemNBT || !itemNBT[nbtKey]) return false;

      return itemNBT[nbtKey] === nbtValue;
    });
});