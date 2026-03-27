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

      // Mapear slotName a la API correcta
      switch (slotName) {
        case "mainhand":
          item = entity.getMainHandItem();
          break;
        case "offhand":
          item = entity.getOffHandItem();
          break;
        case "boots":
          item = entity.bootsItem;
          break;
        case "leggings":
          item = entity.leggingsItem;
          break;
        case "chestplate":
          item = entity.chestplateItem;
          break;
        case "helmet":
          item = entity.helmetItem;
          break;
        default:
          return false;
      }

      if (!item || item.isEmpty()) return;

      let itemNBT = item.nbt || {};

      // --- NBT → Propiedad ---
      if (itemNBT[nbtKey] != null) {
        let value = parseInt(itemNBT[nbtKey]);
        if (!isNaN(value)) {
          palladium.setProperty(entity, propertyKey, value);
        }
      }

      // --- Propiedad → NBT ---
      let propertyValue = palladium.getProperty(entity, propertyKey);
      if (propertyValue != null) {
        itemNBT[nbtKey] = parseInt(propertyValue);
        item = item.withNBT(itemNBT);

        // Volver a colocar el ítem en el slot
        switch (slotName) {
          case "mainhand":
            entity.mainHandItem = item;
            break;
          case "offhand":
            entity.offHandItem = item;
            break;
          case "boots":
            entity.bootsItem = item;
            break;
          case "leggings":
            entity.leggingsItem = item;
            break;
          case "chestplate":
            entity.chestplateItem = item;
            break;
          case "helmet":
            entity.helmetItem = item;
            break;
        }
      }
    });
});
