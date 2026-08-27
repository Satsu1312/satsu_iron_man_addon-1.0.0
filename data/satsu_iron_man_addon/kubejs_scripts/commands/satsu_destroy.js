(function() {
  const $Block = Java.loadClass('net.minecraft.world.level.block.Block');
  const $BlockPosArgument = Java.loadClass('net.minecraft.commands.arguments.coordinates.BlockPosArgument');

  ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
      Commands.literal('satsu_destroy')
        .requires(src => src.hasPermission(2))
        .then(Commands.argument('from', Arguments.BLOCK_POS.create(event))
          .then(Commands.argument('to', Arguments.BLOCK_POS.create(event))
            .executes(ctx => {
              let player = ctx.getSource().getPlayerOrException();
              let level = ctx.getSource().getLevel();
              
              let from = $BlockPosArgument.getLoadedBlockPos(ctx, 'from');
              let to = $BlockPosArgument.getLoadedBlockPos(ctx, 'to');

              let hasValidCuriosItem = false;
              try {
                let playerNbt = player.nbt;
                if (playerNbt && playerNbt.ForgeCaps) {
                  let curiosCap = playerNbt.ForgeCaps.get('curios:inventory');
                  
                  if (curiosCap && curiosCap.Curios) {
                    curiosCap.Curios.forEach(slotGroup => {
                      if (slotGroup.Identifier === 'tecnology_armor') {
                        if (slotGroup.StacksHandler && slotGroup.StacksHandler.Stacks && slotGroup.StacksHandler.Stacks.Items) {
                          let itemsList = slotGroup.StacksHandler.Stacks.Items;
                          
                          itemsList.forEach(slotItem => {
                            if (slotItem) {
                              let tag = slotItem.tag || null;

                              if (tag) {
                                let mode = "";
                                let enabled = "";

                                try {
                                  mode = tag.getString ? tag.getString("mine_mode") : (tag.mine_mode || "");
                                } catch (e) {}

                                try {
                                  enabled = tag.getString ? tag.getString("enabled_mine") : (tag.enabled_mine || "");
                                } catch (e) {}

                                let isModeSilk = (mode === 'silk_touch');
                                let isEnabled = (enabled === 'true' || enabled === true || enabled === '1' || enabled === 1);

                                if (isModeSilk && isEnabled) {
                                  hasValidCuriosItem = true;
                                }
                              }
                            }
                          });
                        }
                      }
                    });
                  }
                }
              } catch (error) {}

              let tool = hasValidCuriosItem 
                ? Item.of('minecraft:diamond_pickaxe').enchant('minecraft:silk_touch', 1) 
                : Item.of('minecraft:diamond_pickaxe');

              BlockPos.betweenClosed(from, to).forEach(pos => {
                let blockState = level.getBlockState(pos);

                if (!blockState.isAir() && !blockState.is('satsu_iron_man_addon:no_destroy')) {
                  let drops = $Block.getDrops(
                    blockState,
                    level,
                    pos,
                    level.getBlockEntity(pos),
                    player,
                    tool
                  );

                  if (drops && drops.length > 0) {
                    drops.forEach(drop => {
                      $Block.popResource(level, pos, Item.of(drop));
                    });
                  }

                  level.setBlockAndUpdate(pos, Block.id('minecraft:air').blockState);
                }
              });

              return 1;
            })
          )
        )
    );
  });
})();