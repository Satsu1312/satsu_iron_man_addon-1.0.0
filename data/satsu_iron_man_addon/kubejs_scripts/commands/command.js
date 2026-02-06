
ServerEvents.commandRegistry(event => {
  const { commands: Commands, arguments: Arguments } = event

  // Register a basic command
  // Command with arguments
  event.register(
    Commands.literal('award')
      .requires(src => src.hasPermission(2))
      .then(Commands.argument('player', Arguments.PLAYER.create(event))
        .then(Commands.argument('item', Arguments.ITEM_STACK.create(event))
          .then(Commands.argument('count', Arguments.INTEGER.create(event))
            .executes(ctx => {
              // Get arguments
              const player = Arguments.PLAYER.getResult(ctx, 'player')
              const item = Arguments.ITEM_STACK.getResult(ctx, 'item')
              const count = Arguments.INTEGER.getResult(ctx, 'count')
              
              // Clone the item and set count
              const itemToGive = item.withCount(count)
              
              // Give item to player
              player.give(itemToGive)
              
              // Send confirmation
              ctx.source.sendSuccess(
                Text.of(`Gave ${count}x ${item.id} to ${player.name}`),
                true
              )
              
              return count
            })
          )
        )
      )
  )
})