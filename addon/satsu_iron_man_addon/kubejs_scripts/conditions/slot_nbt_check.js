StartupEvents.registry("palladium:condition_serializer", (event) => {
  event
    .create("satsu_iron_man_addon:slot_nbt_check")
    .addProperty(
      "slot",
      "string",
      "mainhand",
      "Slot to check (mainhand, offhand, feet, legs, chest, head, curios:slot)",
    )
    .addProperty("nbtKey", "string", "CustomTag", "The NBT key to check")
    .addProperty("nbtValue", "string", "Active", "The required NBT value")
    .addProperty(
      "mode",
      "string",
      "equals",
      "Comparison mode (equals, exists, notEquals, contains, numericEquals)",
    )

    .test((entity, props) => {
      const slotName = props.get("slot");
      const nbtKey = props.get("nbtKey");
      const nbtValue = props.get("nbtValue");
      const mode = props.get("mode");

      let item;
      if (slotName.startsWith("curios:")) {
        const CuriosApi = Java.loadClass(
          "top.theillusivec4.curios.api.CuriosApi",
        );
        const curiosSlot = slotName.split(":")[1];
        const handlerOpt = CuriosApi.getCuriosHelper().getCuriosHandler(entity);
        const handler = handlerOpt.orElse(null);
        if (!handler) return false;

        const stacksOpt = handler.getStacksHandler(curiosSlot);
        const stacks = stacksOpt.orElse(null);
        if (!stacks) return false;

        item = stacks.getStacks().getStackInSlot(0); // primer slot del tipo
      } else {
        item = entity.getItemBySlot(slotName);
      }

      if (!item || item.isEmpty() || !item.nbt) return false;

      const actualValue = item.nbt[nbtKey];
      if (actualValue == null) return false;

      switch (mode) {
        case "equals":
          return actualValue === nbtValue;
        case "notEquals":
          return actualValue !== nbtValue;
        case "exists":
          return true;
        case "contains":
          return (
            typeof actualValue === "string" && actualValue.includes(nbtValue)
          );
        case "numericEquals":
          return Number(actualValue) === Number(nbtValue);
        default:
          return false;
      }
    });
});
