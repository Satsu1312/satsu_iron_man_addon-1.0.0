// KubeJS Command Registration Template

// Register a custom command
ServerEvents.commandRegistry((event) => {
  const { commands: Commands, arguments: Arguments } = event;

  // Register a basic command
  // Command with arguments
  event.register(
    Commands.literal("satsu_iron_man_reset_custom_color").executes((ctx) => {
      // Get the player from context
      const player = ctx.source.player;
      // Send confirmation message
      palladium.setProperty(
        player,
        "satsu_iron_man_addon.PrimaryColour",
        0xc7001d,
      );

      palladium.setProperty(
        player,
        "satsu_iron_man_addon.SecondaryColour",
        0xffce6b,
      );

      palladium.setProperty(
        player,
        "satsu_iron_man_addon.TertiaryColour",
        0x1f1f1f,
      );

      palladium.setProperty(
        player,
        "satsu_iron_man_addon_beam_core_color",
        0xd9f1ff,
      );

      palladium.setProperty(
        player,
        "satsu_iron_man_addon_beam_glow_color",
        0x3ab2d7,
      );

      return parseInt(16);
    }),
  );
});
