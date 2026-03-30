ServerEvents.commandRegistry((e) => {
  const { commands: C, arguments: A } = e;
  e.register(
    C.literal("satsu_set_item_nbt").then(
      C.argument("slot", A.STRING.create(e)).then(
        C.argument("nbtKey", A.STRING.create(e)).then(
          C.argument("nbtValue", A.STRING.create(e)).executes((ctx) => {
            const p = ctx.source.player;
            let s = A.STRING.getResult(ctx, "slot");
            const k = A.STRING.getResult(ctx, "nbtKey");
            const v = A.STRING.getResult(ctx, "nbtValue");

            // Si el slot empieza con "curios_", lo convertimos a curios:slot
            if (s.startsWith("curios_")) {
              s = "curios:" + s.substring(7);
            }

            const stacksOrItem = global.getItemFromSlot(p, s);
            if (!stacksOrItem)
              return (p.tell(Text.red("No hay ítem en ese slot.")), 0);

            const item = s.startsWith("curios:")
              ? stacksOrItem.getStackInSlot(0)
              : stacksOrItem;
            if (!item || item.isEmpty())
              return (p.tell(Text.red("No hay ítem en ese slot.")), 0);

            let nbt = item.nbt || {};

            if (k === "Enchantments") {
              let ench = nbt.Enchantments || [];
              if (v.toLowerCase() === "remove") ench = [];
              else {
                const m = v.match(/^(minecraft)([a-z_]+)(\d+)$/i);
                if (!m)
                  return (
                    p.tell(
                      Text.red("Formato inválido. Usa minecraftsharpness5"),
                    ),
                    0
                  );
                ench.push({ id: `${m[1]}:${m[2]}`, lvl: Number(m[3]) || 1 });
              }
              nbt.Enchantments = ench;
            } else {
              if (v.toLowerCase() === "remove") delete nbt[k];
              else nbt[k] = v;
            }

            const newIt = item.withNBT(nbt);
            global.setItemInSlot(p, s, newIt);

            return 1;
          }),
        ),
      ),
    ),
  );
});
