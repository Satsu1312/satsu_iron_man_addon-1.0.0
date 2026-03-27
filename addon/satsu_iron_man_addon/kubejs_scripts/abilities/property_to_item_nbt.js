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

      // Mapear slotName a la API correcta
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

      if (!item || item.isEmpty()) return;

      // Leer valor de la propiedad Palladium
      let propertyValue = palladium.getProperty(entity, propertyKey);
      if (propertyValue == null) return;

      // Actualizar NBT del ítem con el valor de la propiedad
      let itemNBT = item.nbt || {};
      itemNBT[nbtKey] = propertyValue;

      // Reemplazar el ítem con NBT actualizado
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
