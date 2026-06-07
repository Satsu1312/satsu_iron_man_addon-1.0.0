ServerEvents.commandRegistry((event) => {
  const { commands: Commands, arguments: Arguments } = event;

  event.register(
    Commands.literal("satsu_set_property")
      .then(
        Commands.argument("property", Arguments.STRING.create(event))
          .then(
            Commands.argument(
              "value",
              Arguments.INTEGER.create(event),
            ).executes((ctx) => {
              const player = ctx.source.player;
              const property = Arguments.STRING.getResult(ctx, "property");
              const value = Arguments.INTEGER.getResult(ctx, "value");
              palladium.setProperty(player, property, value);
              ctx.source.sendSuccess(
                Text.of(`Propiedad '${property}' establecida en ${value}`),
                true,
              );

              return value;
            }),
          ),
      ),
  );
});
