StartupEvents.registry("palladium:abilities", (event) => {
  event
    .create("satsu_iron_man_addon:curse_of_binding_modifier")
    .icon(palladium.createItemIcon("minecraft:enchanted_book"))
    .addProperty(
      "slot",
      "string",
      "chest",
      "Slot to check (mainhand, offhand, feet, legs, chest, head, curios:slot)",
    )

    .tick((entity, entry, holder, enabled) => {
      if (!enabled) return;

      const slotName = entry.getPropertyByName("slot");

      const stacksOrItem = global.getItemFromSlot(entity, slotName);
      if (!stacksOrItem) return;

      const item = slotName.startsWith("curios:")
        ? stacksOrItem.getStackInSlot(0)
        : stacksOrItem;

      if (!item || item.isEmpty()) return;

      // Clonamos o creamos el NBT base del ítem
      let itemNBT = item.nbt ?? {};
      
      // Minecraft guarda los encantamientos en una lista llamada 'Enchantments' (o 'id' y 'lvl')
      // Inicializamos la lista de encantamientos si no existe
      if (!itemNBT.hasOwnProperty("Enchantments")) {
        itemNBT["Enchantments"] = [];
      }

      // Verificamos si ya tiene la maldición de ligamiento en su NBT
      let hasBinding = false;
      for (let i = 0; i < itemNBT["Enchantments"].length; i++) {
        if (itemNBT["Enchantments"][i].id === "minecraft:binding_curse") {
          hasBinding = true;
          break;
        }
      }

      // Si no la tiene, se la inyectamos directamente al formato NBT de Minecraft
      if (!hasBinding) {
        itemNBT["Enchantments"].push({
          id: "minecraft:binding_curse",
          lvl: 1
        });

        // Aplicamos el nuevo NBT y actualizamos el slot usando tu método global
        const newItem = item.withNBT(itemNBT);
        global.setItemInSlot(entity, slotName, newItem);
      }
    });
});