StartupEvents.registry("palladium:abilities", (event) => {
  event
    .create("satsu_iron_man_addon:item_nbt_property_sync")
    .icon(palladium.createItemIcon("minecraft:diamond"))
    .addProperty(
      "slot",
      "string",
      "mainhand",
      "Slot to sync (mainhand, offhand, feet, legs, chest, head, curios:slot)",
    )
    .addProperty("nbtKey", "string", "energy", "The NBT key to sync")
    .addProperty(
      "propertyKey",
      "string",
      "satsu_iron_man_addon_mod.property",
      "The Palladium property to sync",
    )
    .addProperty(
      "syncMode",
      "string",
      "property",
      "Sync mode (property, nbt, mixed)",
    )

    .tick((entity, entry, holder, enabled) => {
      if (!enabled) return;

      const slotName = entry.getPropertyByName("slot");
      const nbtKey = entry.getPropertyByName("nbtKey");
      const propertyKey = entry.getPropertyByName("propertyKey");
      const syncMode = entry.getPropertyByName("syncMode");

      const stacksOrItem = global.getItemFromSlot(entity, slotName);
      if (!stacksOrItem) return;

      const item = slotName.startsWith("curios:")
        ? stacksOrItem.getStackInSlot(0)
        : stacksOrItem;
      if (!item || item.isEmpty()) return;

      const itemNBT = item.nbt ?? {};
      const nbtValue = itemNBT[nbtKey];
      const propValue = palladium.getProperty(entity, propertyKey);

      const parsedNBT =
        nbtValue != null && !isNaN(Number(nbtValue))
          ? Number(nbtValue)
          : nbtValue;
      const parsedProp =
        propValue != null && !isNaN(Number(propValue))
          ? Number(propValue)
          : propValue;

      let finalValue;
      if (syncMode === "property" && parsedProp != null) {
        finalValue = parsedProp;
      } else if (syncMode === "nbt" && parsedNBT != null) {
        finalValue = parsedNBT;
      } else if (syncMode === "mixed") {
        if (parsedNBT != null && parsedProp != null) {
          finalValue =
            typeof parsedNBT === "number" && typeof parsedProp === "number"
              ? Math.min(parsedNBT, parsedProp)
              : (parsedNBT ?? parsedProp);
        } else {
          finalValue = parsedNBT ?? parsedProp;
        }
      } else return;

      if (finalValue == null) return;
      if (
        itemNBT[nbtKey] === finalValue &&
        palladium.getProperty(entity, propertyKey) === finalValue
      )
        return;

      palladium.setProperty(entity, propertyKey, finalValue);
      itemNBT[nbtKey] = finalValue;
      const newItem = item.withNBT(itemNBT);

      global.setItemInSlot(entity, slotName, newItem);
    });
});
