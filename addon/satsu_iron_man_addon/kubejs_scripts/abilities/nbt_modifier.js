// Archivo: kubejs/startup_scripts/palladium_nbt_modifier.js

StartupEvents.registry("palladium:abilities", (event) => {
  event
    .create("satsu_iron_man_addon:nbt_modifier")
    .icon(palladium.createItemIcon("minecraft:command_block"))
    .documentationDescription(
      "Modify an item's NBT value by add, subtract or set.",
    )
    .addProperty(
      "slot",
      "string",
      "mainhand",
      "Slot to check (mainhand, offhand, boots, leggings, chestplate, helmet)",
    )
    .addProperty("nbtKey", "string", "energy", "The NBT key to modify")
    .addProperty("adjustment_type", "string", "add", "add, subtract or set")
    .addProperty("adjustment_amount", "integer", 1, "Amount to adjust")

    .tick((entity, entry, holder, enabled) => {
      if (!enabled) return;

      const slotName = entry.getPropertyByName("slot");
      const nbtKey = entry.getPropertyByName("nbtKey");
      const adjustType = entry.getPropertyByName("adjustment_type");
      const adjustAmt = entry.getPropertyByName("adjustment_amount");

      let item = entity.getItemBySlot(slotName);
      if (!item || item.isEmpty()) return;

      let itemNBT = item.nbt || {};
      let current = itemNBT[nbtKey] != null ? parseInt(itemNBT[nbtKey]) : 0;

      const actions = {
        add: () => current + adjustAmt,
        subtract: () => current - adjustAmt,
        set: () => adjustAmt,
      };

      if (actions[adjustType]) {
        let newValue = actions[adjustType]();
        itemNBT[nbtKey] = newValue;

        // Declarar una sola vez y asignar
        let newItem = item.withNBT(itemNBT);

        // Escritura silenciosa en jugadores, universal en Armor Stand
        if (entity.inventory) {
          switch (slotName) {
            case "feet":
              entity.inventory.setItem(36, newItem);
              break;
            case "legs":
              entity.inventory.setItem(37, newItem);
              break;
            case "chest":
              entity.inventory.setItem(38, newItem);
              break;
            case "head":
              entity.inventory.setItem(39, newItem);
              break;
            case "mainhand":
              entity.setItemSlot("mainhand", newItem);
              break;
            case "offhand":
              entity.setItemSlot("offhand", newItem);
              break;
          }
        } else {
          entity.setItemSlot(slotName, newItem);
        }
      }
    });
});
