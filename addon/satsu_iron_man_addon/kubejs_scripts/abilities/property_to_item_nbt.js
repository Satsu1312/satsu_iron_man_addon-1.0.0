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

      let item = entity.getItemBySlot(slotName);
      if (!item || item.isEmpty()) return;

      let propertyValue = palladium.getProperty(entity, propertyKey);
      if (propertyValue == null) return;

      let itemNBT = item.nbt || {};
      itemNBT[nbtKey] = propertyValue;
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
