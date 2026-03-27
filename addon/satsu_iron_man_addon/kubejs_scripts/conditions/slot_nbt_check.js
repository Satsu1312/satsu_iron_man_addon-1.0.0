StartupEvents.registry("palladium:condition_serializer", event => {
  event
    .create("satsu_iron_man_addon:slot_nbt_check")
    .addProperty("slot", "string", "mainhand", "Slot to check (mainhand, offhand, boots, leggings, chestplate, helmet)")
    .addProperty("nbtKey", "string", "CustomTag", "The NBT key to check")
    .addProperty("nbtValue", "string", "Active", "The required NBT value")
    .test((entity, props) => {
      const slotName = props.get("slot");
      const nbtKey   = props.get("nbtKey");
      const nbtValue = props.get("nbtValue");

      let item = null;

      switch (slotName) {
        case "mainhand":
          item = entity.getMainHandItem();
          break;
        case "offhand":
          item = entity.getOffHandItem();
          break;
        case "boots":
          item = entity.inventory.getArmor(0);
          break;
        case "leggings":
          item = entity.inventory.getArmor(1);
          break;
        case "chestplate":
          item = entity.inventory.getArmor(2);
          break;
        case "helmet":
          item = entity.inventory.getArmor(3);
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