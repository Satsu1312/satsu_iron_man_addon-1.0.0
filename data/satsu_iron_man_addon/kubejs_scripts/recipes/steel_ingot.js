// Smelting recipe template

ServerEvents.recipes((event) => {
  event
    .smelting(
      // output item
      "satsu_iron_man_addon:steel_ingot",
      "satsu_iron_man_addon:raw_steel" // input item
    )
    .xp(1.0) // optional: set XP
    .cookingTime(140); // optional: cook time in ticks (200 = 10 seconds)
});
ServerEvents.recipes((event) => {
  event
    event.blasting(
      // output item
      "satsu_iron_man_addon:steel_ingot",
      "satsu_iron_man_addon:raw_steel" // input item
    )
    .xp(1.0) // optional: set XP
    .cookingTime(60); // optional: cook time in ticks (200 = 10 seconds)
});