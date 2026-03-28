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
      if (!enabled || !entity.isPlayer()) return;

      const slotName = entry.getPropertyByName("slot");
      const nbtKey = entry.getPropertyByName("nbtKey");
      const adjustType = entry.getPropertyByName("adjustment_type");
      const adjustAmt = entry.getPropertyByName("adjustment_amount");

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
          return;
      }

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
        item = item.withNBT(itemNBT);

        // Reemplazar ítem en slot
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
      }
    });
});
