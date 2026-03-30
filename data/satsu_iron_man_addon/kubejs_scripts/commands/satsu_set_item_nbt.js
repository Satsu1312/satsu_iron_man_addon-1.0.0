ServerEvents.commandRegistry((event) => {
  const { commands: Commands, arguments: Arguments } = event;

  event.register(
    Commands.literal("satsu_set_item_nbt").then(
      Commands.argument("slot", Arguments.STRING.create(event)).then(
        Commands.argument("nbtKey", Arguments.STRING.create(event)).then(
          Commands.argument(
            "nbtValue",
            Arguments.STRING.create(event),
          ).executes((ctx) => {
            const player = ctx.source.player;
            const slotName = Arguments.STRING.getResult(ctx, "slot");
            const nbtKey = Arguments.STRING.getResult(ctx, "nbtKey");
            const nbtValue = Arguments.STRING.getResult(ctx, "nbtValue");

            const item = player.getItemBySlot(slotName);
            if (!item || item.isEmpty()) {
              player.tell(Text.red("No hay ítem en ese slot."));
              return 0;
            }

            let itemNBT = item.nbt || {};

            if (nbtValue.toLowerCase() === "remove") {
              delete itemNBT[nbtKey];
              player.tell(Text.green(`NBT '${nbtKey}' eliminado del ítem.`));
            } else {
              itemNBT[nbtKey] = nbtValue;
              player.tell(
                Text.green(`NBT '${nbtKey}' actualizado a '${nbtValue}'.`),
              );
            }

            const newItem = item.withNBT(itemNBT);

            const slotMap = {
              feet: 36,
              legs: 37,
              chest: 38,
              head: 39,
            };

            if (slotMap[slotName]) {
              player.inventory.setItem(slotMap[slotName], newItem);
            } else {
              player.setItemSlot(slotName, newItem);
            }

            return 1;
          }),
        ),
      ),
    ),
  );
});
