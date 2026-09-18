ServerEvents.commandRegistry((event) => {
  const { commands: Commands, arguments: Arguments } = event;

  event.register(
    Commands.literal("satsu_set_scale_damage")
      .requires((source) => source.hasPermission(2))
      .then(
        Commands.argument("value", Arguments.INTEGER.create(event))
          .executes((ctx) => {
            const player = ctx.source.player;
            const value = Arguments.INTEGER.getResult(ctx, "value");
            
            if (value < 1 || value > 5) {
              return 0;
            }

            const property = "satsu_iron_man_addon_scale_damage";
            palladium.setProperty(player, property, value);

            return value;
          }),
      ),
  );
});