// Archivo: kubejs/startup_scripts/palladium_item_energy_sync.js

StartupEvents.registry("palladium:abilities", (event) => {
  event
    .create("satsu_iron_man_addon:item_property_sync")
    .icon(palladium.createItemIcon("minecraft:diamond"))
    .addProperty(
      "slot",
      "string",
      "mainhand",
      "Slot to sync (mainhand, offhand, boots, leggings, chestplate, helmet)",
    )
    .addProperty("nbtKey", "string", "energy", "The NBT key to sync")
    .addProperty(
      "propertyKey",
      "string",
      "satsu_iron_man_addon_mod.property",
      "The Palladium property to sync",
    )
    .addProperty(
      "syncMode",
      "string",
      "property",
      "Sync mode (property, nbt, mixed)",
    )
    .tick((entity, entry, holder, enabled) => {
      if (!enabled) return;

      const slotName = entry.getPropertyByName("slot");
      const nbtKey = entry.getPropertyByName("nbtKey");
      const propertyKey = entry.getPropertyByName("propertyKey");
      const syncMode = entry.getPropertyByName("syncMode");

      let item = null;

      switch (slotName) {
        case "mainhand":
          item = entity.getItemBySlot("mainhand");
          break;
        case "offhand":
          item = entity.getItemBySlot("offhand");
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

      if (!item || item.isEmpty()) return;

      let itemNBT = item.nbt || {};
      let nbtValue = itemNBT[nbtKey] != null ? parseInt(itemNBT[nbtKey]) : null;
      let propValue = palladium.getProperty(entity, propertyKey);

      let finalValue = null;

      // --- Modo de sincronización ---
      switch (syncMode) {
        case "property":
          if (propValue != null && !isNaN(propValue)) {
            finalValue = parseInt(propValue);
          }
          break;
        case "nbt":
          if (nbtValue != null && !isNaN(nbtValue)) {
            finalValue = nbtValue;
          }
          break;
        case "mixed":
          if (nbtValue != null && propValue != null) {
            finalValue = Math.min(nbtValue, propValue);
          } else {
            finalValue = nbtValue ?? propValue;
          }
          break;
      }

      if (finalValue == null) return;

      // --- Escribir en ambos lados ---
      palladium.setProperty(entity, propertyKey, finalValue);
      itemNBT[nbtKey] = finalValue;
      item = item.withNBT(itemNBT);

      // Reemplazar ítem en slot (sin sonido en armaduras)
      switch (slotName) {
        case "mainhand":
          entity.setItemSlot("mainhand", item);
          break;
        case "offhand":
          entity.setItemSlot("offhand", item);
          break;
        case "feet":
          entity.inventory.setItem(36, item); // botas
          break;
        case "legs":
          entity.inventory.setItem(37, item); // leggings
          break;
        case "chest":
          entity.inventory.setItem(38, item); // pechera
          break;
        case "head":
          entity.inventory.setItem(39, item); // casco
          break;
      }
    });
});
