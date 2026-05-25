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

    // ==========================================
    // 1. PRIMER TICK: Al activar la habilidad
    // ==========================================
    .firstTick((entity, entry, holder, enabled) => {
      if (!enabled) return;

      // Usamos 'var' para que Rhino no crashee en las recargas
      var slotName = entry.getPropertyByName("slot");
      var stacksOrItem = global.getItemFromSlot(entity, slotName);
      if (!stacksOrItem) return;

      var item = slotName.startsWith("curios:")
        ? stacksOrItem.getStackInSlot(0)
        : stacksOrItem;

      if (!item || item.isEmpty()) return;

      var itemNBT = item.nbt ?? {};
      
      if (!itemNBT.hasOwnProperty("Enchantments")) {
        itemNBT["Enchantments"] = [];
      }

      var hasBinding = false;
      for (var i = 0; i < itemNBT["Enchantments"].length; i++) {
        if (itemNBT["Enchantments"][i].id === "minecraft:binding_curse") {
          hasBinding = true;
          break;
        }
      }

      if (!hasBinding) {
        itemNBT["Enchantments"].push({
          id: "minecraft:binding_curse",
          lvl: 1
        });

        // ELIMINAMOS la variable newItem por completo.
        // Inyectamos el NBT directamente dentro de la función global.
        global.setItemInSlot(entity, slotName, item.withNBT(itemNBT));
      }
    })

    // ==========================================
    // 2. ÚLTIMO TICK: Al desactivar la habilidad
    // ==========================================
    .lastTick((entity, entry, holder, enabled) => {
      var slotName = entry.getPropertyByName("slot");
      var stacksOrItem = global.getItemFromSlot(entity, slotName);
      if (!stacksOrItem) return;

      var item = slotName.startsWith("curios:")
        ? stacksOrItem.getStackInSlot(0)
        : stacksOrItem;

      if (!item || item.isEmpty()) return;

      var itemNBT = item.nbt ?? {};

      if (itemNBT.hasOwnProperty("Enchantments")) {
        var originalLength = itemNBT["Enchantments"].length;
        
        itemNBT["Enchantments"] = itemNBT["Enchantments"].filter(
          (enchant) => enchant.id !== "minecraft:binding_curse"
        );

        if (itemNBT["Enchantments"].length !== originalLength) {
          if (itemNBT["Enchantments"].length === 0) {
            delete itemNBT["Enchantments"];
          }
          
          // Mismo caso: inyectamos directo sin variables intermedias
          global.setItemInSlot(entity, slotName, item.withNBT(itemNBT));
        }
      }
    });
});