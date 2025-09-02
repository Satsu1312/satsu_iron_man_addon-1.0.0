// Smelting recipe template

ServerEvents.recipes((event) => {
  event
    .smelting(
      // output item
      "satsu_iron_man_addon:steel_gold_refined_alloy",
      "satsu_iron_man_addon:steel_gold_alloy" // input item
    )
    .xp(1.0) // optional: set XP
    .cookingTime(160); // optional: cook time in ticks (200 = 10 seconds)
});
ServerEvents.recipes((event) => {
  event
    event.blasting(
      // output item
      "satsu_iron_man_addon:steel_gold_refined_alloy",
      "satsu_iron_man_addon:steel_gold_alloy" // input item
    )
    .xp(1.0) // optional: set XP
    .cookingTime(70); // optional: cook time in ticks (200 = 10 seconds)
});
