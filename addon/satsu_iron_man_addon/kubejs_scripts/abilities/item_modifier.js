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

      const item = entity.getItemBySlot(slotName);
      if (!item || item.isEmpty()) return;

      const itemNBT = item.nbt ?? {};

      // Evitar escrituras si ya tiene el valor correcto
      if (itemNBT[nbtKey] === nbtValue) return;

      itemNBT[nbtKey] = nbtValue;
      const newItem = item.withNBT(itemNBT);

      if (entity.inventory) {
        const slotMap = {
          feet: 36,
          legs: 37,
          chest: 38,
          head: 39,
        };

        if (slotMap[slotName]) {
          entity.inventory.setItem(slotMap[slotName], newItem);
        } else {
          entity.setItemSlot(slotName, newItem);
        }
      } else {
        entity.setItemSlot(slotName, newItem);
      }
    });
});
