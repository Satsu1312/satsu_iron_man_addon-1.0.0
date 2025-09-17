//Made by FSang18
StartupEvents.registry("palladium:condition_serializer", (event) => {
  event
    .create("satsu_iron_man_addon:has_property_min")
    .addProperty(
      "property",
      "string",
      "fsang_property",
      "The name of the property to look for"
    )
    .addProperty(
      "property_value_min",
      "integer",
      1,
      "The value of the property to return"
    )
    .addProperty(
      "property_value_max",
      "integer",
      1000000000000000000000000000000000000000000000000000000000000000000,
      "The value of the property to return"
    )
    .test((entity, props) => {
      let PallProp = props.get("property");
      let MinValue = props.get("property_value_min");
      let MaxValue = props.get("property_value_max");
      if (palladium.getProperty(entity, PallProp) >= MinValue && palladium.getProperty(entity, PallProp) <= MaxValue  ) {
        return true;
      } else {
        return false;
      }
    });
});
