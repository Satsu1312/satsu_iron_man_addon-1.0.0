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
      // Filtro de seguridad indispensable para servidores
      if (!entity || typeof global.getItemFromSlot !== "function") return false;

      const slotName = props.get("slot");
      const nbtKey = props.get("nbtKey");
      const nbtValue = props.get("nbtValue");
      const mode = props.get("mode");

      const stacksOrItem = global.getItemFromSlot(entity, slotName);
      if (!stacksOrItem) return false;

      let item = null;

      // BLINDAJE MULTIPLAYER: Validamos que el contenedor de Curios sea real y tenga slots
      if (slotName.startsWith("curios:")) {
        try {
          // Si el contenedor existe y tiene más de 0 slots, agarramos el primero de forma segura
          if (typeof stacksOrItem.getSlots === "function" && stacksOrItem.getSlots() > 0) {
            item = stacksOrItem.getStackInSlot(0);
          }
        } catch (e) {
          return false; // Si coincide con un cambio de inventario abrupto, frena el crasheo
        }
      } else {
        item = stacksOrItem;
      }

      // Volvemos a tu flujo original intacto basado en item.nbt
      if (!item || item.isEmpty() || !item.nbt) return false;

      const actualValue = item.nbt[nbtKey];
      if (actualValue == null) return false;

      switch (mode) {
        case "equals":
          return actualValue === nbtValue;
        case "notEquals":
          return actualValue !== nbtValue;
        case "exists":
          return true; // Mantenemos tu retorno nativo para que el NOT de Palladium funcione
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