ServerEvents.commandRegistry((e) => {
  const { commands: C, arguments: A } = e;
  
  e.register(
    C.literal("satsu_repair_item").then(
      C.argument("slot", A.STRING.create(e)).executes((ctx) => {
        const p = ctx.source.player;
        let s = A.STRING.getResult(ctx, "slot");

        if (s.startsWith("curios_")) {
          s = "curios:" + s.substring(7);
        }

        const stacksOrItem = global.getItemFromSlot(p, s);
        if (!stacksOrItem) return 0;

        const item = s.startsWith("curios:")
          ? stacksOrItem.getStackInSlot(0)
          : stacksOrItem;
          
        if (!item || item.isEmpty()) return 0;

        if (!item.isDamageableItem()) return 0;

        if (item.getDamageValue() === 0) return 0;

        let newIt = item.copy();
        newIt.setDamageValue(0); 

        global.setItemInSlot(p, s, newIt);

        return 1;
      })
    )
  );
});