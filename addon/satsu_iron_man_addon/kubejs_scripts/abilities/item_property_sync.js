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
    .tick((entity, entry, holder, enabled) => {
      if (!enabled) return;

      const slotName = entry.getPropertyByName("slot");
      const nbtKey = entry.getPropertyByName("nbtKey");
      const propertyKey = entry.getPropertyByName("propertyKey");

      let item = null;

      switch (slotName) {
        case "mainhand":
          item = entity.getItemBySlot("mainhand");
          break;
        case "offhand":
          item = entity.getItemBySlot("offhand");
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
          return false;
      }

      if (!item || item.isEmpty()) return;

      let itemNBT = item.nbt || {};
      let nbtValue = itemNBT[nbtKey] != null ? parseInt(itemNBT[nbtKey]) : null;
      let propValue = palladium.getProperty(entity, propertyKey);

      // Decidir valor final: si existe NBT lo usamos, si no, usamos propiedad
      let finalValue = null;
      if (nbtValue != null && !isNaN(nbtValue)) {
        finalValue = nbtValue;
      } else if (propValue != null && !isNaN(propValue)) {
        finalValue = parseInt(propValue);
      }

      if (finalValue == null) return;

      // --- Escribir en ambos lados ---
      palladium.setProperty(entity, propertyKey, finalValue);
      itemNBT[nbtKey] = finalValue;
      item = item.withNBT(itemNBT);

      // Reemplazar ítem en slot
      entity.setItemSlot(
        slotName === "boots"
          ? "feet"
          : slotName === "leggings"
            ? "legs"
            : slotName === "chestplate"
              ? "chest"
              : slotName === "helmet"
                ? "head"
                : slotName,
        item,
      );
    });
});
