// Archivo: kubejs/server_scripts/satsu_item_nbt_command.js

ServerEvents.commandRegistry((event) => {
  const { commands: Commands, arguments: Arguments } = event;

  event.register(
    Commands.literal("satsu_set_item_nbt")
      .then(Commands.argument("slot", Arguments.STRING.create(event))
        .then(Commands.argument("nbtKey", Arguments.STRING.create(event))
          .then(Commands.argument("nbtValue", Arguments.STRING.create(event))
            .executes((ctx) => {
              const player = ctx.source.player;
              const slotName = Arguments.STRING.getResult(ctx, "slot");
              const nbtKey = Arguments.STRING.getResult(ctx, "nbtKey");
              const nbtValue = Arguments.STRING.getResult(ctx, "nbtValue");

              let item = null;

              switch (slotName) {
                case "mainhand": item = player.getItemBySlot("mainhand"); break;
                case "offhand": item = player.getItemBySlot("offhand"); break;
                case "feet": item = player.getItemBySlot("feet"); break;
                case "legs": item = player.getItemBySlot("legs"); break;
                case "chest": item = player.getItemBySlot("chest"); break;
                case "head": item = player.getItemBySlot("head"); break;
                default:
                  player.tell(Text.red(`Slot inválido: ${slotName}`));
                  return 0;
              }

              if (!item || item.isEmpty()) {
                player.tell(Text.red("No hay ítem en ese slot."));
                return 0;
              }

              let itemNBT = item.nbt || {};
              itemNBT[nbtKey] = nbtValue;
              item = item.withNBT(itemNBT);

              switch (slotName) {
                case "mainhand": player.setItemSlot("mainhand", item); break;
                case "offhand": player.setItemSlot("offhand", item); break;
                case "feet": player.inventory.setItem(36, item); break;
                case "legs": player.inventory.setItem(37, item); break;
                case "chest": player.inventory.setItem(38, item); break;
                case "head": player.inventory.setItem(39, item); break;
              }

              return 1;
            })
          )
        )
      )
  );
});