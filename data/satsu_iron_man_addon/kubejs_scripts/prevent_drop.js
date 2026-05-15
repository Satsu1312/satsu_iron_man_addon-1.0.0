EntityEvents.spawned("item", (event) => {
  const itemEntity = event.entity;
  if (!itemEntity || !itemEntity.item) return;

  const stack = itemEntity.item;

  // Make sure Thrower exists
  const throwerUUID = itemEntity.nbt?.Thrower;
  if (!throwerUUID) return;

  let thrower = null;

  event.level
    .getEntitiesWithin(itemEntity.getBoundingBox().inflate(10))
    .forEach((e) => {
      if (!e.nbt || !e.nbt.UUID) return;

      if (String(e.nbt.UUID) === String(throwerUUID)) {
        thrower = e;
      }
    });

  if (!thrower) return;

  palladium.abilities.getEntries(thrower).forEach((entry) => {
    const ability = entry.getConfiguration()?.ability?.id;
    if (ability !== "satsu_iron_man_addon:prevent_drop") return;

    const targetItem = entry.getPropertyByName("item");
    if (!targetItem) return;

    if (stack.id === targetItem) {
      thrower.give(stack);
      event.cancel();
    }
  });
});