//Made by FSang18
StartupEvents.registry("palladium:condition_serializer", (event) => {
  event
    .create("satsu_iron_man_addon:has_property")
    .addProperty(
      "property",
      "string",
      "fsang_property",
      "The name of the property to look for"
    )
    .addProperty(
      "property_value",
      "string",
      "fsang_property_value",
      "The value of the property to return"
    )
    .test((entity, props) => {
      let PallProp = props.get("property");
      let PallPropValue = props.get("property_value");
      if (palladium.getProperty(entity, PallProp) == PallPropValue) {
        return true;
      } else {
        return false;
      }
    });
});
