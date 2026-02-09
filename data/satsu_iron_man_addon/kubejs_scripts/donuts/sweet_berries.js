// Shaped crafting recipe template

ServerEvents.recipes(event => {
  event.shaped(
    Item.of('satsu_iron_man_addon:donuts/donut_sweet_berries', 1), // output item with count
    [
      '   ', // crafting pattern (3x3 grid)
      ' db', // A, B, C, etc. represent items in the pattern
      '   '
    ],
    {
      b: 'minecraft:sweet_berries',  // A = iron ingot
      d: 'satsu_iron_man_addon:donuts/donut_base', // C = copper ingot
    }
  )
})