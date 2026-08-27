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

              // 1. Verificación de tu propiedad personalizada en el jugador
              let isSilkActive = false;
              try {
                var satsuPropVal = palladium.getProperty(player, "satsu_iron_man_addon_silk_touch");
                if (satsuPropVal === true || String(satsuPropVal).toLowerCase() === "true" || satsuPropVal === 1 || satsuPropVal === "1") {
                  isSilkActive = true;
                }
              } catch (error) {}

              // Herramienta a usar en getDrops: Toque de seda si la propiedad está activa, o pico normal si no lo está
              let tool = isSilkActive 
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