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
      "Slot to check (mainhand, offhand, feet, legs, chest, head, curios:slot)",
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

      const stacksOrItem = global.getItemFromSlot(entity, slotName);
      if (!stacksOrItem) return;

      const item = slotName.startsWith("curios:")
        ? stacksOrItem.getStackInSlot(0)
        : stacksOrItem;
      if (!item || item.isEmpty()) return;

      const itemNBT = item.nbt ?? {};
      const current = Number(itemNBT[nbtKey]) || 0;

      let newValue = current;
      if (adjustType === "add") newValue += adjustAmt;
      else if (adjustType === "subtract") newValue -= adjustAmt;
      else if (adjustType === "set") newValue = adjustAmt;
      else return;

      if (newValue === current) return;

      itemNBT[nbtKey] = newValue;
      const newItem = item.withNBT(itemNBT);

      global.setItemInSlot(entity, slotName, newItem);
    });
});
