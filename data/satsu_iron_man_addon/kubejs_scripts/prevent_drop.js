EntityEvents.spawned("item", (event) => {
  let { entity } = event;
  let /**@type {Internal.ItemEntity} */ item = entity.item;

  let thrower;
  event.level
    .getEntitiesWithin(event.entity.getBoundingBox().inflate(10))
    .forEach((e) => {
      if (e.nbt.UUID.toString() == event.entity.nbt.Thrower.toString())
        thrower = e;
    });

  if (thrower != undefined) {
    palladium.abilities.getEntries(thrower).forEach((entry) => {
      if (entry.getConfiguration().ability.id == "satsu_iron_man_addon:prevent_drop") {
        if (item.item.id == entry.getPropertyByName("item")) {
          thrower.give(item);
          event.cancel();
        }
      }
    });
  }
});
