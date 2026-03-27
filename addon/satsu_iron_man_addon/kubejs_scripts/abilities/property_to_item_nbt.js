// Archivo: kubejs/startup_scripts/palladium_property_to_nbt.js

StartupEvents.registry("palladium:abilities", (event) => {
  event
    .create("satsu_iron_man_addon:property_to_item_nbt")
    .icon(palladium.createItemIcon("minecraft:stick"))
    .addProperty(
      "slot",
      "string",
      "mainhand",
      "Slot to check (mainhand, offhand, boots, leggings, chestplate, helmet)",
    )
    .addProperty("nbtKey", "string", "skillCharge", "The NBT key to set")
    .addProperty(
      "propertyKey",
      "string",
      "satsu_iron_man_addon_mod.skill_charge",
      "The Palladium property to read",
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

      let propertyValue = palladium.getProperty(entity, propertyKey);
      if (propertyValue == null) return;

      let itemNBT = item.nbt || {};
      itemNBT[nbtKey] = propertyValue;

      item = item.withNBT(itemNBT);

      // Reemplazar ítem en slot (sin sonido en armaduras)
      switch (slotName) {
        case "mainhand":
          entity.setItemSlot("mainhand", item);
          break;
        case "offhand":
          entity.setItemSlot("offhand", item);
          break;
        case "boots":
          entity.inventory.setItem(36, item); // botas
          break;
        case "leggings":
          entity.inventory.setItem(37, item); // leggings
          break;
        case "chestplate":
          entity.inventory.setItem(38, item); // pechera
          break;
        case "helmet":
          entity.inventory.setItem(39, item); // casco
          break;
      }
    });
});
