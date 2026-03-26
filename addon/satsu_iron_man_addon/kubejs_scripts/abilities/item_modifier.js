StartupEvents.registry("palladium:abilities", (event) => {
  event
    .create("satsu_iron_man_addon:item_modifier")
    .icon(palladium.createItemIcon("minecraft:diamond"))
    .addProperty("slot", "string", "mainhand", "Slot to check (mainhand, offhand, boots, leggings, chestplate, helmet)")
    .addProperty("nbtKey", "string", "CustomTag", "The NBT key to modify")
    .addProperty("nbtValue", "string", "Active", "The value to set for the NBT key")
    .tick((entity, entry, holder, enabled) => {
      if (!enabled) return;

      const slotName = entry.getPropertyByName("slot");
      const nbtKey = entry.getPropertyByName("nbtKey");
      const nbtValue = entry.getPropertyByName("nbtValue");

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
          return;
      }

      if (!item || item.isEmpty()) return;

      // Obtener NBT actual o crear uno nuevo
      let itemNBT = item.nbt || {};
      itemNBT[nbtKey] = nbtValue;

      // Reemplazar el item con NBT modificado
      item = item.withNBT(itemNBT);

      // Volver a colocar el item en el slot
      switch (slotName) {
        case "mainhand":
          entity.mainHandItem = item;
          break;
        case "offhand":
          entity.offHandItem = item;
          break;
        case "boots":
          entity.setArmor(0, item);
          break;
        case "leggings":
          entity.setArmor(1, item);
          break;
        case "chestplate":
          entity.setArmor(2, item);
          break;
        case "helmet":
          entity.setArmor(3, item);
          break;
      }
    });
});