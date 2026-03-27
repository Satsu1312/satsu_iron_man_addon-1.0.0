// Archivo: kubejs/startup_scripts/palladium_nbt_to_property.js

StartupEvents.registry("palladium:abilities", (event) => {
  event
    .create("satsu_iron_man_addon:item_nbt_to_property")
    .icon(palladium.createItemIcon("minecraft:stick"))
    .addProperty(
      "slot",
      "string",
      "mainhand",
      "Slot to check (mainhand, offhand, boots, leggings, chestplate, helmet)",
    )
    .addProperty("nbtKey", "string", "skillCharge", "The NBT key to read")
    .addProperty(
      "propertyKey",
      "string",
      "satsu_iron_man_addon_mod.skill_charge",
      "The Palladium property to set",
    )
    .tick((entity, entry, holder, enabled) => {
      if (!enabled) return;

      const slotName = entry.getPropertyByName("slot");
      const nbtKey = entry.getPropertyByName("nbtKey");
      const propertyKey = entry.getPropertyByName("propertyKey");

      let item = null;

      // Usar getItemBySlot para todos los casos
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
          return;
      }

      if (!item || item.isEmpty() || !item.nbt) return;

      const itemNBT = item.nbt;
      if (itemNBT[nbtKey] == null) return;

      let rawValue = itemNBT[nbtKey];
      let value = parseInt(rawValue);

      if (!isNaN(value)) {
        palladium.setProperty(entity, propertyKey, value);
      }
    });
});
