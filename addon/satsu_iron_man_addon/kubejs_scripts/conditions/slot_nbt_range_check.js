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
      let slotName = props.get("slot");
      let nbtKey = props.get("nbtKey");
      let min = props.get("min");
      let max = props.get("max");
      let mode = props.get("mode");

      let item = null;

      // 1. Manejo de Slots (Curios vs Standard)
      if (slotName.startsWith("curios:")) {
        let parts = slotName.split(":");
        let cSlot = parts[1];

        try {
          // Cambio para KubeJS 6 (Server compatible)
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
        // Funciona en Players y Armor Stands
        item = entity.getEquipment(slotName);
      }

      // 2. Validaciones de seguridad
      if (!item || item.isEmpty() || !item.nbt) return false;

      // 3. Conversión numérica segura
      let value = Number(item.nbt[nbtKey]);
      if (isNaN(value)) return false;

      // 4. Lógica de comparación original
      switch (mode) {
        case "range":
        case "betweenInclusive":
          return value >= min && value <= max;
        case "greaterThan":
          return value > min;
        case "lessThan":
          return value < max;
        case "equals":
          return value === min;
        case "betweenExclusive":
          return value > min && value < max;
        default:
          return false;
      }
    });
});
