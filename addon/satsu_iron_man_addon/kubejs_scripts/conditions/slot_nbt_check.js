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
      // Control de seguridad crucial para evitar crasheos en el servidor y cliente
      if (!entity || !entity.isLiving()) return false;

      const slotName = props.get("slot");
      const nbtKey = props.get("nbtKey");
      const nbtValue = props.get("nbtValue");
      const mode = props.get("mode");

      let item = null;

      // 1. Lógica Segura para ranuras de Curios
      if (slotName.startsWith("curios:")) {
        try {
          // Uso de Java.type para máxima compatibilidad cross-platform/cross-thread
          const CuriosApi = Java.type("top.theillusivecoyote.curios.api.CuriosApi");
          const optionalHelper = CuriosApi.getCuriosHelper().getCuriosHandler(entity);
          
          if (optionalHelper.isPresent()) {
            const handler = optionalHelper.get();
            const stacksHandler = handler.getStacksHandler(slotName.substring(7));
            if (stacksHandler.isPresent()) {
              const itemStacks = stacksHandler.get().getStacks();
              // Verifica que existan slots disponibles en el contenedor antes de acceder al índice 0
              if (itemStacks && itemStacks.getSlots() > 0) {
                item = itemStacks.getStackInSlot(0);
              }
            }
          }
        } catch (e) {
          return false;
        }
      } else {
        try {
          // Uso de Java.type para resolver la clase EquipmentSlot de forma segura
          const EquipmentSlot = Java.type("net.minecraft.world.entity.EquipmentSlot");
          
          switch (slotName) {
            case "mainhand":
              item = entity.getItemBySlot(EquipmentSlot.MAINHAND);
              break;
            case "offhand":
              item = entity.getItemBySlot(EquipmentSlot.OFFHAND);
              break;
            case "head":
              item = entity.getItemBySlot(EquipmentSlot.HEAD);
              break;
            case "chest":
              item = entity.getItemBySlot(EquipmentSlot.CHEST);
              break;
            case "legs":
              item = entity.getItemBySlot(EquipmentSlot.LEGS);
              break;
            case "feet":
              item = entity.getItemBySlot(EquipmentSlot.FEET);
              break;
            default:
              return false;
          }
        } catch (e) {
          return false;
        }
      }

      // Si la ranura consultada no posee ningún ítem o está vacía
      if (!item || item.isEmpty()) return false;

      // 3. Lectura del NBT garantizando compatibilidad en Multiplayer
      const tag = item.getOrCreateTag();
      if (!tag || !tag.contains(nbtKey)) {
        return mode === "notEquals";
      }

      // Obtención limpia del valor en formato String compatible con Rhino
      const actualValue = tag.get(nbtKey).getAsString();
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