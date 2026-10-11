StartupEvents.registry("palladium:condition_serializer", (event) => {
  event
    .create("satsu_iron_man_addon:uuid_nbt_check")
    .addProperty(
      "slot",
      "string",
      "mainhand",
      "Slot to check (mainhand, offhand, feet, legs, chest, head, curios:slot)",
    )
    .addProperty("nbtKey", "string", "player_main", "The NBT key to check")
    .addProperty("nbtValue", "string", "Active", "The required NBT value (ignored if usePlayerUUID is true)")
    .addProperty(
      "mode",
      "string",
      "equals",
      "Comparison mode (equals, exists, notEquals, contains, numericEquals)",
    )
    .addProperty(
      "usePlayerUUID",
      "string",
      "false",
      "Set to true to compare against the player's UUID",
    )

    .test((entity, props) => {
      // Filtro de seguridad indispensable para servidores
      if (!entity || typeof global.getItemFromSlot !== "function") return false;

      const slotName = props.get("slot");
      const nbtKey = props.get("nbtKey");
      const mode = props.get("mode");
      const useUUID = props.get("usePlayerUUID") === "true";

      // Determinamos el valor a comparar: si useUUID es true, usamos el UUID de la entidad
      let targetValue = props.get("nbtValue");
      if (useUUID) {
        if (!entity.isPlayer()) return false;
        targetValue = entity.uuid.toString();
      }

      const stacksOrItem = global.getItemFromSlot(entity, slotName);
      if (!stacksOrItem) return false;

      let item = null;

      // BLINDAJE MULTIPLAYER: Validamos que el contenedor de Curios sea real y tenga slots
      if (slotName.startsWith("curios:")) {
        try {
          if (typeof stacksOrItem.getSlots === "function" && stacksOrItem.getSlots() > 0) {
            item = stacksOrItem.getStackInSlot(0);
          }
        } catch (e) {
          return false; // Si coincide con un cambio de inventario abrupto, frena el crasheo
        }
      } else {
        item = stacksOrItem;
      }

      // Validamos item y NBT
      if (!item || item.isEmpty() || !item.nbt) return false;

      const actualValue = item.nbt[nbtKey];
      if (actualValue == null) return false;

      switch (mode) {
        case "equals":
          return actualValue === targetValue;
        case "notEquals":
          return actualValue !== targetValue;
        case "exists":
          return true; // Mantenemos tu retorno nativo para que el NOT de Palladium funcione
        case "contains":
          return (
            typeof actualValue === "string" && actualValue.includes(targetValue)
          );
        case "numericEquals":
          return Number(actualValue) === Number(targetValue);
        default:
          return false;
      }
    });
});