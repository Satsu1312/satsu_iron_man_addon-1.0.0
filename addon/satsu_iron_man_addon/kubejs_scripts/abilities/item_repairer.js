StartupEvents.registry("palladium:abilities", (event) => {
  event
    .create("satsu_iron_man_addon:item_repairer")
    .icon(palladium.createItemIcon("minecraft:anvil"))
    .documentationDescription(
      "Automatically repairs or damages the item in the specified slot over time.",
    )
    .addProperty(
      "slot",
      "string",
      "mainhand",
      "Slot to check (mainhand, offhand, feet, legs, chest, head, curios:slot)",
    )
    .addProperty(
      "repair_amount",
      "integer",
      1,
      "Amount of durability to change per tick (negative values damage)",
    )

    .tick((entity, entry, holder, enabled) => {
      if (!enabled) return;

      const slotName = entry.getPropertyByName("slot");
      const repairAmt = entry.getPropertyByName("repair_amount");
      if (repairAmt === 0) return;

      const stacksOrItem = global.getItemFromSlot(entity, slotName);
      if (!stacksOrItem) return;

      const item = slotName.startsWith("curios:")
        ? stacksOrItem.getStackInSlot(0)
        : stacksOrItem;
      if (!item || item.isEmpty() || !item.isDamageableItem()) return;

      const itemNBT = item.nbt ?? {};
      const currentDamage = Number(itemNBT.Damage) || 0;
      const maxDamage = item.getMaxDamage();

      if (repairAmt > 0 && currentDamage <= 0) return;
      if (repairAmt < 0 && currentDamage >= maxDamage) return;

      let newDamage = currentDamage - repairAmt;

      if (newDamage <= 0) {
        delete itemNBT.Damage;
        global.setItemInSlot(entity, slotName, item.withNBT(itemNBT));
      } else if (newDamage >= maxDamage) {
        let brokenItem = item.copy();
        brokenItem.setCount(0);
        global.setItemInSlot(entity, slotName, brokenItem);
      } else {
        itemNBT.Damage = newDamage;
        global.setItemInSlot(entity, slotName, item.withNBT(itemNBT));
      }
    });
});