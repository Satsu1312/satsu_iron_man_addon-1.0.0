// KubeJS Command Registration Template

// Register a custom command
ServerEvents.commandRegistry(event => {
  const { commands: Commands, arguments: Arguments } = event

  // Register a basic command
  // Command with arguments
  event.register(
    Commands.literal('satsu_set_flight_speed')
      .then(Commands.argument('player', Arguments.PLAYER.create(event)))
        .then(Commands.argument('speed', Arguments.speed_STACK.create(event)))
          .then(Commands.argument('count', Arguments.INTEGER.create(event)))
            .executes(ctx => {
              // Get arguments
              const player = Arguments.PLAYER.getResult(ctx, 'player')
              let speed = palladium.getProperty(ctx, 'satsu_iron_man_flight_speed_choose')
              const count = Arguments.INTEGER.getResult(ctx, 'count')
              
              // Clone the speed and set count
              const speedToGive = speed.withCount(count)
              
              // Give speed to player
              player.give(speedToGive)
              
              // Send confirmation
              ctx.source.sendSuccess(
                Text.of(`Gave ${count}x ${speed.id} to ${player.name}`),
                true
              )
              
              return count
            })
          )
        )
      )
  )
})