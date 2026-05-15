ServerEvents.commandRegistry((event) => {
  const { commands: Commands } = event;

  event.register(
    Commands.literal("satsu_iron_man_reset_custom_color").executes((ctx) => {
      const player = ctx.source.player;
      
      const chestItem = player.getChestArmorItem();

      if (chestItem && !chestItem.isEmpty()) {
        let nbt = chestItem.getOrCreateTag();
        
        nbt.remove("main_color");
        nbt.remove("secondary_color");
        nbt.remove("thirty_color");
        nbt.remove("beam_core_color");
        nbt.remove("beam_glow_color");
        
        // Sincronización opcional si el cambio visual no es instantáneo
        if (player.inventoryMenu) {
          player.inventoryMenu.broadcastChanges();
        }
      }

      return 1;
    })
  );
});