StartupEvents.registry("palladium:abilities", (event) => {
  event
    .create("satsu_iron_man_addon:item_nbt_to_property")
    .icon(palladium.createItemIcon("minecraft:stick"))
    .addProperty(
      "slot",
      "string",
      "mainhand",
      "Slot to check (mainhand, offhand, feet, legs, chest, head)",
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
      const item = entity.getItemBySlot(slotName);
      if (!item?.nbt || item.isEmpty()) return;

      const nbtKey = entry.getPropertyByName("nbtKey");
      const propertyKey = entry.getPropertyByName("propertyKey");
      const rawValue = item.nbt[nbtKey];
      if (rawValue == null) return;

      const value = isNaN(Number(rawValue))
        ? String(rawValue)
        : Number(rawValue);
      palladium.setProperty(entity, propertyKey, value);
    });
});
