// Made by FSang18 (Modified for Server Sync)

StartupEvents.registry("palladium:abilities", (event) => {
  event
    .create("satsu_iron_man_addon:user_identity")
    .icon(palladium.createItemIcon("minecraft:name_tag"))
    // Definimos la propiedad donde se guardará el nombre
    .addProperty(
      "stored_username",
      "string",
      "None",
      "The username of the player owner.",
    );
});
