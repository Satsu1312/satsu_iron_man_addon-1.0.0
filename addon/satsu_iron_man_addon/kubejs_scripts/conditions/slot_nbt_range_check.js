//credits to jaijorlon
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
      if (!entity) {
        return false;
      }

      const slotName = props.get("slot");
      const nbtKey = props.get("nbtKey");
      const min = props.get("min");
      const max = props.get("max");
      const mode = props.get("mode");

      let item = null;
      let curioSlotType = "";
      let handlerOpt = null;
      let curiosMap = null;
      let slotHandler = null;
      let CuriosApiClass = null;

      try {
        if (slotName.startsWith("curios:")) {
          curioSlotType = slotName.replace("curios:", "");

          CuriosApiClass = Java.loadClass(
            "top.theillusivec4.curios.api.CuriosApi",
          );
          handlerOpt = CuriosApiClass.getCuriosHelper()
            .getCuriosHandler(entity)
            .resolve();

          if (handlerOpt.isPresent()) {
            curiosMap = handlerOpt.get().getCurios();
            if (curiosMap.containsKey(curioSlotType)) {
              slotHandler = curiosMap.get(curioSlotType);
              if (slotHandler != null) {
                item = slotHandler.getStacks().getStackInSlot(0);
              }
            }
          }
        } else {
          switch (slotName) {
            case "mainhand":
              item = entity.getMainHandItem();
              break;
            case "offhand":
              item = entity.getOffhandItem();
              break;
            case "feet":
              item = entity.getItemBySlot(0);
              break;
            case "legs":
              item = entity.getItemBySlot(1);
              break;
            case "chest":
              item = entity.getItemBySlot(2);
              break;
            case "head":
              item = entity.getItemBySlot(3);
              break;
            default:
              item = null;
              break;
          }
        }
      } catch (e) {
        return false;
      }

      if (!item || item.isEmpty() || !item.nbt) {
        return false;
      }

      const value = Number(item.nbt[nbtKey]);
      if (isNaN(value)) {
        return false;
      }

      let result = false;
      switch (mode) {
        case "range":
        case "betweenInclusive":
          result = value >= min && value <= max;
          break;
        case "greaterThan":
          result = value > min;
          break;
        case "lessThan":
          result = value < max;
          break;
        case "equals":
          result = value === min;
          break;
        case "betweenExclusive":
          result = value > min && value < max;
          break;
        default:
          result = false;
          break;
      }

      return result;
    });
});
