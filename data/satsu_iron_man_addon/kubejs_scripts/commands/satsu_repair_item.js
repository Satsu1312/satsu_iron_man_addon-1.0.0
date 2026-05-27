ServerEvents.commandRegistry((e) => {
  const { commands: C, arguments: A } = e;
  
  e.register(
    C.literal("satsu_repair_item").then(
      C.argument("slot", A.STRING.create(e)).executes((ctx) => {
        const p = ctx.source.player;
        let s = A.STRING.getResult(ctx, "slot");

        // Si el slot empieza con "curios_", lo convertimos a curios:slot (igual que en tu script)
        if (s.startsWith("curios_")) {
          s = "curios:" + s.substring(7);
        }

        // Obtener el ítem usando tu función global
        const stacksOrItem = global.getItemFromSlot(p, s);
        if (!stacksOrItem) return (p.tell(Text.red("No hay ítem en ese slot.")), 0);

        const item = s.startsWith("curios:")
          ? stacksOrItem.getStackInSlot(0)
          : stacksOrItem;
          
        if (!item || item.isEmpty()) return (p.tell(Text.red("No hay ítem en ese slot.")), 0);

        // Validar si el ítem es reparable (tiene durabilidad)
        if (!item.isDamageableItem()) {
            p.tell(Text.yellow("Este ítem no tiene durabilidad y no se puede reparar."));
            return 0;
        }

        // Validar si el ítem ya está al máximo de durabilidad (Daño == 0)
        if (item.getDamageValue() === 0) {
            p.tell(Text.yellow("El ítem ya está en perfectas condiciones."));
            return 0;
        }

        // Creamos una copia del ítem para modificarla y asegurarnos de que se actualice
        let newIt = item.copy();
        
        // REPARACIÓN: Establecemos el valor de daño a 0
        newIt.setDamageValue(0); 
        
        // (Alternativa NBT si alguna vez falla el método anterior:
        // let nbt = newIt.nbt || {};
        // delete nbt.Damage;
        // newIt = newIt.withNBT(nbt); )

        // Reemplazar el ítem dañado por el reparado en el inventario del jugador
        global.setItemInSlot(p, s, newIt);

        // Feedback al jugador
        p.tell(Text.green("¡El ítem en el slot " + s + " ha sido reparado exitosamente!"));

        return 1;
      })
    )
  );
});