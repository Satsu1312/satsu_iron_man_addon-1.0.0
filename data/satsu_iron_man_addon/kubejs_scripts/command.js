// KubeJS Command Registration Template

// Register a custom command
ServerEvents.commandRegistry((event) => {
  const { commands: Commands, arguments: Arguments } = event;

  // Register a basic command
  // Command with arguments
  event.register(
    Commands.literal("satsu_set_flight_speed")
      .then(Commands.argument("player", Arguments.PLAYER.create(event)))
      .then(Commands.argument("number", Arguments.INTEGER.create(event)))
      .executes((ctx) => {
        // Get arguments
        const player = Arguments.PLAYER.getResult(ctx, "player");
        let number = Arguments.INTEGER.getResult(ctx, "number");
        palladium.setProperty(
          player,
          "satsu_iron_man_flight_speed_choose",
          number
        );
      })
  );
});
