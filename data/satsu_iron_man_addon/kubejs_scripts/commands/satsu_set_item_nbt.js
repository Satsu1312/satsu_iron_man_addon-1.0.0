ServerEvents.commandRegistry((e) => {
  const { commands: C, arguments: A } = e;
  e.register(
    C.literal("satsu_set_item_nbt").then(
      C.argument("slot", A.STRING.create(e)).then(
        C.argument("nbtKey", A.STRING.create(e)).then(
          C.argument("nbtValue", A.STRING.create(e)).executes((ctx) => {
            const p = ctx.source.player,
              s = A.STRING.getResult(ctx, "slot"),
              k = A.STRING.getResult(ctx, "nbtKey"),
              v = A.STRING.getResult(ctx, "nbtValue"),
              it = p.getItemBySlot(s);
            if (!it || it.isEmpty())
              return (p.tell(Text.red("No hay ítem en ese slot.")), 0);
            let nbt = it.nbt || {};

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

            const newIt = it.withNBT(nbt),
              map = { feet: 36, legs: 37, chest: 38, head: 39 };
            map[s]
              ? p.inventory.setItem(map[s], newIt)
              : p.setItemSlot(s, newIt);
            return 1;
          }),
        ),
      ),
    ),
  );
});
