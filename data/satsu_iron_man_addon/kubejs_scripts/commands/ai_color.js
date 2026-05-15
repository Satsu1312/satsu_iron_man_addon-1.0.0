// KubeJS Command Registration Template

// Register a custom command
ServerEvents.commandRegistry((event) => {
  const { commands: Commands, arguments: Arguments } = event;

  // Register a basic command
  // Command with arguments
  event.register(
    Commands.literal("satsu_set_ai_color").then(
      Commands.argument("hud_color", Arguments.STRING.create(event)).then(
        Commands.argument("background_color", Arguments.STRING.create(event)).executes(
          (ctx) => {
            // Get the player from context
            const player = ctx.source.player;
            const hud_value = Arguments.STRING.getResult(ctx, "hud_color");
            const background_value = Arguments.STRING.getResult(ctx, "background_color");
            // Send confirmation message
            palladium.setProperty(player, "satsu_iron_man_ia_color", hud_value);
            palladium.setProperty(player, "satsu_iron_man_ia_color_background", background_value);
            return parseInt(hud_value, 16);
          }
        )
      )
    )
  );
});
