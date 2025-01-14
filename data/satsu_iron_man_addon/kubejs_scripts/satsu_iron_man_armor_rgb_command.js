ServerEvents.commandRegistry((event) => {
  const { commands: Commands, arguments: Arguments } = event;

  event.register(
    Commands.literal("irommanarmorcolor").then(
      Commands.argument("entity", Arguments.PLAYER.create(event)).then(
        Commands.argument("colorhex", Arguments.STRING.create(event)).executes(
          (ctx) => {
            let target = Arguments.PLAYER.getResult(ctx, "entity");
            let server = ctx.source.getServer();
            let player = ctx.source.player;
            let username = player.getGameProfile().getName();
            const colorhex = Arguments.STRING.getResult(ctx, "colorhex");
            {
              palladium.setProperty(target, "satsuironmanrgb", colorhex);
              return 1;
            }
          }
        )
      )
    )
  );
});
