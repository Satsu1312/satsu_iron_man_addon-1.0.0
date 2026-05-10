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
      let slotName = props.get("slot");
      let nbtKey = props.get("nbtKey");
      let nbtValue = props.get("nbtValue");
      let mode = props.get("mode");

      let item = null;

      if (slotName.startsWith("curios:")) {
        let parts = slotName.split(":");
        let cSlot = parts[1];

        try {
          // Cambio clave: Usamos Java.loadClass en lugar de java()
          let CuriosApi = Java.loadClass(
            "top.theillusivec4.curios.api.CuriosApi",
          );
          let curioInventory = CuriosApi.getCuriosHelper()
            .getCuriosHandler(entity)
            .orElse(null);

          if (curioInventory) {
            let stacks = curioInventory.getStacksHandler(cSlot).orElse(null);
            if (stacks && stacks.getSlots() > 0) {
              item = stacks.getStackInSlot(0);
            }
          }
        } catch (e) {
          item = null;
        }
      } else {
        item = entity.getEquipment(slotName);
      }

      if (!item || item.isEmpty() || !item.nbt) return false;

      let actualValue = item.nbt[nbtKey];
      if (actualValue == null) return false;

      switch (mode) {
        case "equals":
          return String(actualValue) === String(nbtValue);
        case "notEquals":
          return String(actualValue) !== String(nbtValue);
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
