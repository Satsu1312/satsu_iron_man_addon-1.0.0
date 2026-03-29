// Archivo: kubejs/startup_scripts/palladium_item_property_sync.js

StartupEvents.registry("palladium:abilities", (event) => {
  event
    .create("satsu_iron_man_addon:item_property_sync")
    .icon(palladium.createItemIcon("minecraft:diamond"))
    .addProperty(
      "slot",
      "string",
      "mainhand",
      "Slot to sync (mainhand, offhand, boots, leggings, chestplate, helmet)",
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

      const item = entity.getItemBySlot(slotName);
      if (!item || item.isEmpty()) return;

      const itemNBT = item.nbt ?? {};
      const rawNBT = itemNBT[nbtKey];
      const rawProp = palladium.getProperty(entity, propertyKey);

      // Detectar tipo: número o string
      const nbtValue =
        rawNBT != null && !isNaN(Number(rawNBT)) ? Number(rawNBT) : rawNBT;
      const propValue =
        rawProp != null && !isNaN(Number(rawProp)) ? Number(rawProp) : rawProp;

      let finalValue;
      switch (syncMode) {
        case "property":
          if (propValue != null) finalValue = propValue;
          break;
        case "nbt":
          if (nbtValue != null) finalValue = nbtValue;
          break;
        case "mixed":
          if (nbtValue != null && propValue != null) {
            // Si ambos son números, usar el menor
            if (typeof nbtValue === "number" && typeof propValue === "number") {
              finalValue = Math.min(nbtValue, propValue);
            } else {
              // Si son strings o tipos distintos, priorizar NBT
              finalValue = nbtValue ?? propValue;
            }
          } else {
            finalValue = nbtValue ?? propValue;
          }
          break;
        default:
          return;
      }

      if (finalValue == null) return;

      // Evitar escrituras innecesarias
      if (
        itemNBT[nbtKey] === finalValue &&
        palladium.getProperty(entity, propertyKey) === finalValue
      )
        return;

      palladium.setProperty(entity, propertyKey, finalValue);
      itemNBT[nbtKey] = finalValue;
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
