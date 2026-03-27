// Archivo: kubejs/startup_scripts/palladium_item_modifier.js

StartupEvents.registry("palladium:abilities", (event) => {
  event
    .create("satsu_iron_man_addon:item_modifier")
    .icon(palladium.createItemIcon("minecraft:diamond"))
    .addProperty(
      "slot",
      "string",
      "mainhand",
      "Slot to check (mainhand, offhand, boots, leggings, chestplate, helmet)",
    )
    .addProperty("nbtKey", "string", "CustomTag", "The NBT key to modify")
    .addProperty(
      "nbtValue",
      "string",
      "Active",
      "The value to set for the NBT key",
    )
    .tick((entity, entry, holder, enabled) => {
      if (!enabled) return;

      const slotName = entry.getPropertyByName("slot");
      const nbtKey = entry.getPropertyByName("nbtKey");
      const nbtValue = entry.getPropertyByName("nbtValue");

      let item = null;

      // Obtener ítem según slot
      switch (slotName) {
        case "mainhand":
          item = entity.getMainHandItem();
          break;
        case "offhand":
          item = entity.getOffHandItem();
          break;
        case "boots":
          item = entity.getItemBySlot("feet");
          break;
        case "leggings":
          item = entity.getItemBySlot("legs");
          break;
        case "chestplate":
          item = entity.getItemBySlot("chest");
          break;
        case "helmet":
          item = entity.getItemBySlot("head");
          break;
        default:
          return;
      }

      if (!item || item.isEmpty()) return;

      // Modificar NBT
      let itemNBT = item.nbt || {};
      itemNBT[nbtKey] = nbtValue;
      item = item.withNBT(itemNBT);

      // Volver a colocar el ítem en el slot correcto
      switch (slotName) {
        case "mainhand":
          entity.setItemSlot("mainhand", item);
          break;
        case "offhand":
          entity.setItemSlot("offhand", item);
          break;
        case "boots":
          entity.setItemSlot("feet", item);
          break;
        case "leggings":
          entity.setItemSlot("legs", item);
          break;
        case "chestplate":
          entity.setItemSlot("chest", item);
          break;
        case "helmet":
          entity.setItemSlot("head", item);
          break;
      }
    });
});
