StartupEvents.registry("palladium:abilities", (event) => {
  event
    .create("satsu_iron_man_addon:item_nbt_modifier")
    .icon(palladium.createItemIcon("minecraft:diamond"))
    .addProperty(
      "slot",
      "string",
      "mainhand",
      "Slot to check (mainhand, offhand, feet, legs, chest, head, curios:slot)",
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

      const stacksOrItem = global.getItemFromSlot(entity, slotName);
      if (!stacksOrItem) return;

      const item = slotName.startsWith("curios:")
        ? stacksOrItem.getStackInSlot(0)
        : stacksOrItem;

      if (!item || item.isEmpty()) return;

      // Obtenemos el NBT actual o un objeto vacío si no tiene
      let itemNBT = item.nbt ?? {};
      let changed = false;

      if (nbtValue === "remove") {
        // Lógica para ELIMINAR el tag
        if (itemNBT.hasOwnProperty(nbtKey)) {
          delete itemNBT[nbtKey];
          changed = true;
        }
      } else {
        // Lógica para AGREGAR o MODIFICAR el tag
        if (itemNBT[nbtKey] !== nbtValue) {
          itemNBT[nbtKey] = nbtValue;
          changed = true;
        }
      }

      // Solo actualizamos el slot si hubo un cambio real para evitar lag/ghosting
      if (changed) {
        const newItem = item.withNBT(itemNBT);
        global.setItemInSlot(entity, slotName, newItem);
      }
    });
});
