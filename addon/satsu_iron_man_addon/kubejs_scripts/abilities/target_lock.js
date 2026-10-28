//made by WolfDude24
//the functions are in the client side
StartupEvents.registry("palladium:abilities", (event) => {
  event
    .create("satsu_iron_man_addon:target_lock")
    .icon(palladium.createItemIcon("minecraft:ender_eye"))
    .addProperty("range", "integer", 16, "search range for target")
    .addProperty("mode", "string", "raytrace", "raytrace / nearest / random");
});
