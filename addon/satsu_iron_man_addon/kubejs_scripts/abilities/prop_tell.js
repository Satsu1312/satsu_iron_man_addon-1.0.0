StartupEvents.registry("palladium:abilities", (event) => {
  event
    .create("satsu_iron_man_addon:prop_tell")
    .addProperty(
      "prop",
      "string",
      "posthuman.flameLevel",
      "the name of the property to check"
    )
    .addProperty(
      "message",
      "string",
      "Your flame level is: ",
      "the message to display before the property value"
    )
    .tick((entity, entry, holder, enabled) => {
      if (enabled && entity.isPlayer()) {
        const prop = entry.getPropertyByName("prop");
        const message = entry.getPropertyByName("message");
        let propValue = palladium.getProperty(entity, prop);
        entity.setStatusMessage("§6" + message + propValue);
      }
    });
});
