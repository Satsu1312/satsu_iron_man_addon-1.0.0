ServerEvents.commandRegistry((event) => {
  const { commands: Commands, arguments: Arguments } = event;

  event.register(
    Commands.literal("satsu_set_scale")
      .requires((source) => source.hasPermission(2))
      .then(
        Commands.argument("value", Arguments.FLOAT.create(event))
          .executes((ctx) => {
            const player = ctx.source.player;
            const value = Arguments.FLOAT.getResult(ctx, "value");
            
            // Validamos que el float esté entre 0.2 y 5.0 (puedes ajustar el máximo si lo necesitas)
            if (value < 0.2 || value > 5.0) {
              return 0;
            }

            const property = "satsu_iron_man_addon_scale_damage";
            palladium.setProperty(player, property, value);

            return 1;
          }),
      ),
  );
});