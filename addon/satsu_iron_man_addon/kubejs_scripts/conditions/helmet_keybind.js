StartupEvents.registry("palladium:condition_serializer", (event) => {
  event
    .create("satsu_iron_man_addon:pdata_boolean")
    .addProperty(
      "data",
      "string",
      "first_join",
      "the persistent data boolean to check",
    )
    .addProperty(
      "value",
      "boolean",
      true,
      "the value required for a true result",
    )
    .test((entity, props) => {
      let data = props.get("data");
      let val = props.get("value");
      if (entity.persistentData.getBoolean(data) === val) {
        return true;
      } else {
        return false;
      }
    });
});
StartupEvents.registry("palladium:condition_serializer", (event) => {
  event
    .create("satsu_iron_man_addon:pdata_string")
    .addProperty("data", "string", "dataKey", "the persistent data to check")
    .addProperty(
      "value",
      "string",
      "dataValue",
      "the value required for a true result",
    )
    .test((entity, props) => {
      let data = props.get("data");
      let val = props.get("value");
      if (entity.persistentData.get(data) === val) {
        return true;
      } else {
        return false;
      }
    });
});
StartupEvents.registry("palladium:condition_serializer", (event) => {
  event
    .create("satsu_iron_man_addon:pdata_number")
    .addProperty("data", "string", "dataKey", "the persistent data to check")
    .addProperty("value", "float", 0, "the value required for a true result")
    .test((entity, props) => {
      let data = props.get("data");
      let val = props.get("value");
      if (entity.persistentData.get(data) === val) {
        return true;
      } else {
        return false;
      }
    });
}); // Made by ShadowLegacy557
