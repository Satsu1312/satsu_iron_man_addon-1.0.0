// KubeJS Command Registration Template

// Register a custom command
ServerEvents.commandRegistry((event) => {
  const { commands: Commands, arguments: Arguments } = event;

  // Register a basic command
  // Command with arguments
  event.register(
    Commands.literal("satsu_set_flight_speed")
        .then(Commands.argument("number", Arguments.INTEGER.create(event))
            .executes((ctx) => {
                // Get the player from context
                const player = ctx.source.player;
                const value = Arguments.INTEGER.getResult(ctx, 'number');
                // Send confirmation message
                palladium.setProperty(player, "satsu_iron_man_flight_speed_choose", value);

                return value;
            })
        )
  );
});
