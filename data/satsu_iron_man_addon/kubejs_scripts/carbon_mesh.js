// Smelting recipe template

ServerEvents.recipes((event) => {
  event
    .smelting(
      // output item
      "satsu_iron_man_addon:carbon_mesh",
      "minecraft:charcoal" // input item
    )
    .xp(1.0) // optional: set XP
    .cookingTime(180); // optional: cook time in ticks (200 = 10 seconds)
});
ServerEvents.recipes((event) => {
  event
    event.blasting(
      // output item
      "satsu_iron_man_addon:carbon_mesh",
      "minecraft:charcoal" // input item
    )
    .xp(1.0) // optional: set XP
    .cookingTime(75); // optional: cook time in ticks (200 = 10 seconds)
});