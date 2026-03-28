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

      const item = entity.getItemBySlot(slotName);
      if (!item || item.isEmpty()) return;

      const itemNBT = item.nbt ?? {};
      let current = Number(itemNBT[nbtKey]) || 0;

      // Precalcular nuevo valor según tipo
      let newValue;
      switch (adjustType) {
        case "add":
          newValue = current + adjustAmt;
          break;
        case "subtract":
          newValue = current - adjustAmt;
          break;
        case "set":
          newValue = adjustAmt;
          break;
        default:
          return; // si no coincide, salir
      }

      // Solo actualizar si realmente cambia
      if (newValue === current) return;

      itemNBT[nbtKey] = newValue;
      const newItem = item.withNBT(itemNBT);

      if (entity.inventory) {
        // Mapear slots de armadura a índices
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
