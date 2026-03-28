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

      let item = entity.getItemBySlot(slotName);
      if (!item || item.isEmpty()) return;

      // Modificar NBT
      let itemNBT = item.nbt || {};
      itemNBT[nbtKey] = nbtValue;
      item = item.withNBT(itemNBT);

      // Escritura silenciosa en jugadores, universal en Armor Stand
      if (entity.inventory) {
        switch (slotName) {
          case "feet":
            entity.inventory.setItem(36, item);
            break;
          case "legs":
            entity.inventory.setItem(37, item);
            break;
          case "chest":
            entity.inventory.setItem(38, item);
            break;
          case "head":
            entity.inventory.setItem(39, item);
            break;
          case "mainhand":
            entity.setItemSlot("mainhand", item);
            break;
          case "offhand":
            entity.setItemSlot("offhand", item);
            break;
        }
      } else {
        entity.setItemSlot(slotName, item);
      }
    });
});
