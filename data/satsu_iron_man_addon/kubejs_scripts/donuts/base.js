// Shaped crafting recipe template

ServerEvents.recipes(event => {
  event.shaped(
    Item.of('satsu_iron_man_addon:donuts/donut_base', 2), // output item with count
    [
      ' s ', // crafting pattern (3x3 grid)
      'wew', // A, B, C, etc. represent items in the pattern
      '   '
    ],
    {
      w: 'minecraft:wheat',  // A = iron ingot
      e: 'minecraft:egg',  // B = gold ingot
      s: 'minecraft:sugar', // C = copper ingot
    }
  )
})