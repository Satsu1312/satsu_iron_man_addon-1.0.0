StartupEvents.registry("palladium:abilities", (event) => {
  event
    .create("satsu_iron_man_addon:item_repairer")
    .icon(palladium.createItemIcon("minecraft:anvil"))
    .documentationDescription(
      "Automatically repairs the item in the specified slot over time.",
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
      "Amount of durability to restore per tick",
    )

    .tick((entity, entry, holder, enabled) => {
      // Si la habilidad no está activa, no hace nada
      if (!enabled) return;

      const slotName = entry.getPropertyByName("slot");
      const repairAmt = entry.getPropertyByName("repair_amount");

      // Obtener el contenedor o ítem usando tu función global
      const stacksOrItem = global.getItemFromSlot(entity, slotName);
      if (!stacksOrItem) return;

      // Validar si es un slot de Curios o un slot regular
      const item = slotName.startsWith("curios:")
        ? stacksOrItem.getStackInSlot(0)
        : stacksOrItem;
      if (!item || item.isEmpty()) return;

      // En Minecraft (antes de la 1.20.5), el daño de durabilidad se guarda en el NBT bajo la key "Damage"
      const itemNBT = item.nbt ?? {};
      const currentDamage = Number(itemNBT.Damage) || 0;

      // Si el daño es 0 o menor, significa que el ítem ya está al 100% de su durabilidad
      if (currentDamage <= 0) return;

      // Calcular el nuevo valor de daño (reparar es restar daño)
      let newDamage = currentDamage - repairAmt;

      if (newDamage <= 0) {
        // Si se repara por completo, eliminamos la propiedad Damage para limpiar el NBT
        delete itemNBT.Damage;
      } else {
        itemNBT.Damage = newDamage;
      }

      // Aplicar el NBT modificado al ítem
      const newItem = item.withNBT(itemNBT);

      // Guardar el ítem reparado de vuelta en el slot del jugador/entidad
      global.setItemInSlot(entity, slotName, newItem);
    });
});
