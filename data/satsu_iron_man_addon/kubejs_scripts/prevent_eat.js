ItemEvents.rightClicked((event) => {
  palladium.abilities.getEntries(event.player).forEach((entry) => {
    if (
      entry.getConfiguration().ability.id == "satsu_iron_man_addon:prevent_eat" &&
      entry.enabled &&
      (event.item.is(entry.getPropertyByName("item")) ||
        event.item.hasTag(entry.getPropertyByName("tag")))
    ) {
      event.cancel();
    }
  });
});
