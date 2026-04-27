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

      // CORRECCIÓN: Forzamos el valor a String para evitar el ClassCastException
      const slotName = String(entry.getPropertyByName("slot"));
      const nbtKey = String(entry.getPropertyByName("nbtKey"));
      const propertyKey = String(entry.getPropertyByName("propertyKey"));
      const syncMode = String(entry.getPropertyByName("syncMode"));

      // Obtener el item usando la función global definida en tu addon
      const stacksOrItem = global.getItemFromSlot(entity, slotName);
      if (!stacksOrItem) return;

      const item = slotName.startsWith("curios:")
        ? stacksOrItem.getStackInSlot(0)
        : stacksOrItem;

      if (!item || item.isEmpty()) return;

      // Manejo seguro de NBT
      const itemNBT = item.nbt || {};
      const nbtValue = itemNBT[nbtKey];
      const propValue = palladium.getProperty(entity, propertyKey);

      // Normalización de valores numéricos
      const parsedNBT =
        nbtValue != null && !isNaN(Number(nbtValue))
          ? Number(nbtValue)
          : nbtValue;

      const parsedProp =
        propValue != null && !isNaN(Number(propValue))
          ? Number(propValue)
          : propValue;

      let finalValue;

      // Lógica de Sincronización
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
      } else {
        return;
      }

      if (finalValue == null) return;

      // Evitar bucles infinitos si los valores ya son iguales
      // Comparamos usando Number() para asegurar igualdad numérica exacta
      if (
        Number(itemNBT[nbtKey]) === Number(finalValue) &&
        Number(palladium.getProperty(entity, propertyKey)) ===
          Number(finalValue)
      ) {
        return;
      }

      // Aplicar cambios
      palladium.setProperty(entity, propertyKey, finalValue);

      // Actualizar el item con el nuevo NBT
      let newNBT = item.nbt || {};
      newNBT[nbtKey] = finalValue;
      const newItem = item.withNBT(newNBT);

      global.setItemInSlot(entity, slotName, newItem);
    });
});
