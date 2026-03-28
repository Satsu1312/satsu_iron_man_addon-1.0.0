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

      let item = entity.getItemBySlot(slotName);
      if (!item || item.isEmpty()) return;

      let itemNBT = item.nbt || {};
      let nbtValue = itemNBT[nbtKey] != null ? parseInt(itemNBT[nbtKey]) : null;
      let propValue = palladium.getProperty(entity, propertyKey);

      let finalValue = null;
      switch (syncMode) {
        case "property":
          if (propValue != null && !isNaN(propValue))
            finalValue = parseInt(propValue);
          break;
        case "nbt":
          if (nbtValue != null && !isNaN(nbtValue)) finalValue = nbtValue;
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

      palladium.setProperty(entity, propertyKey, finalValue);
      itemNBT[nbtKey] = finalValue;
      item = item.withNBT(itemNBT);

      // --- Escritura silenciosa ---
      if (entity.inventory) {
        // Jugador: usar índices para evitar sonido
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
        // Armor Stand u otras entidades: solo setItemSlot
        entity.setItemSlot(slotName, item);
      }
    });
});
