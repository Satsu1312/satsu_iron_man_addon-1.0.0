StartupEvents.registry("palladium:condition_serializer", (event) => {
  event
    .create("satsu_iron_man_addon:slot_nbt_range_check")
    .addProperty(
      "slot",
      "string",
      "mainhand",
      "Slot to check (mainhand, offhand, feet, legs, chest, head, curios:slot)",
    )
    .addProperty("nbtKey", "string", "skillCharge", "The NBT key to check")
    .addProperty("min", "integer", 0, "Minimum allowed value")
    .addProperty("max", "integer", 2147483647, "Maximum allowed value")
    .addProperty(
      "mode",
      "string",
      "range",
      "Comparison mode (range, greaterThan, lessThan, equals, betweenInclusive, betweenExclusive)",
    )

    .test((entity, props) => {
      const slotName = props.get("slot");
      const nbtKey = props.get("nbtKey");
      const min = props.get("min");
      const max = props.get("max");
      const mode = props.get("mode");

      let item;
      if (slotName.startsWith("curios:")) {
        const CuriosApi = Java.loadClass(
          "top.theillusivec4.curios.api.CuriosApi",
        );
        const curiosSlot = slotName.split(":")[1];
        const handler = CuriosApi.getCuriosHelper()
          .getCuriosHandler(entity)
          .orElse(null);
        if (!handler) return false;
        const stacks = handler.getStacksHandler(curiosSlot).orElse(null);
        if (!stacks) return false;
        item = stacks.getStacks().getStackInSlot(0);
      } else {
        item = entity.getItemBySlot(slotName);
      }

      if (!item || item.isEmpty() || !item.nbt) return false;

      const value = Number(item.nbt[nbtKey]);
      if (isNaN(value)) return false;

      switch (mode) {
        case "range":
          return value >= min && value <= max;
        case "greaterThan":
          return value > min;
        case "lessThan":
          return value < max;
        case "equals":
          return value === min;
        case "betweenInclusive":
          return value >= min && value <= max;
        case "betweenExclusive":
          return value > min && value < max;
        default:
          return false;
      }
    });
});
