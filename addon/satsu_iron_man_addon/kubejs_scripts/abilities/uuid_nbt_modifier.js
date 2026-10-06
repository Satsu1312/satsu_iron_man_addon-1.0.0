StartupEvents.registry("palladium:abilities", (event) => {
  event
    .create("satsu_iron_man_addon:uuid_nbt_modifier")
    .icon(palladium.createItemIcon("minecraft:diamond"))
    .addProperty(
      "slot",
      "string",
      "mainhand",
      "Slot to check (mainhand, offhand, feet, legs, chest, head, curios:slot)",
    )
    .addProperty("nbtKey", "string", "player_main", "The NBT key to modify")
    .addProperty(
      "usePlayerUUID",
      "string",
      "true",
      "Set to true to use the player's UUID, or enter a custom value",
    )

    .tick((entity, entry, holder, enabled) => {
      if (!enabled) return;

      // Verificamos que la entidad sea un jugador (o tenga UUID)
      if (!entity.isPlayer()) return;

      const slotName = entry.getPropertyByName("slot");
      const nbtKey = entry.getPropertyByName("nbtKey");
      const useUUID = entry.getPropertyByName("usePlayerUUID") === "true";

      // Determinamos el valor: si es true, usamos el UUID del jugador en formato string
      const targetValue = useUUID ? entity.uuid.toString() : entry.getPropertyByName("nbtValue");

      const stacksOrItem = global.getItemFromSlot(entity, slotName);
      if (!stacksOrItem) return;

      const item = slotName.startsWith("curios:")
        ? stacksOrItem.getStackInSlot(0)
        : stacksOrItem;

      if (!item || item.isEmpty()) return;

      // Obtenemos el NBT actual o un objeto vacío si no tiene
      let itemNBT = item.nbt ?? {};
      let changed = false;

      if (targetValue === "remove") {
        // Lógica para ELIMINAR el tag
        if (itemNBT.hasOwnProperty(nbtKey)) {
          delete itemNBT[nbtKey];
          changed = true;
        }
      } else {
        // Lógica para AGREGAR o MODIFICAR el tag con el UUID del jugador
        if (itemNBT[nbtKey] !== targetValue) {
          itemNBT[nbtKey] = targetValue;
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