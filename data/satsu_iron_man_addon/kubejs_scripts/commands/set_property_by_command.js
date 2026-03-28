// KubeJS Command Registration Template

ServerEvents.commandRegistry((event) => {
  const { commands: Commands, arguments: Arguments } = event;

  event.register(
    Commands.literal("satsu_set_property")
      // Argumento para la propiedad
      .then(
        Commands.argument("property", Arguments.STRING.create(event))
          // Argumento para el valor
          .then(
            Commands.argument(
              "value",
              Arguments.INTEGER.create(event),
            ).executes((ctx) => {
              const player = ctx.source.player;
              const property = Arguments.STRING.getResult(ctx, "property");
              const value = Arguments.INTEGER.getResult(ctx, "value");

              // Aplica el cambio dinámicamente
              palladium.setProperty(player, property, value);

              // Mensaje de confirmación
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
