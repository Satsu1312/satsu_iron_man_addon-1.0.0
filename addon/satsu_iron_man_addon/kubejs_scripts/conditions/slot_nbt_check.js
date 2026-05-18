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
      // 1. EL ÚNICO BLINDAJE MULTIPLAYER: Si la entidad no existe o no es válida, salimos sin crashear el servidor
      if (!entity || typeof global.getItemFromSlot !== "function") return false;

      const slotName = props.get("slot");
      const nbtKey = props.get("nbtKey");
      const nbtValue = props.get("nbtValue");
      const mode = props.get("mode");

      // 2. Usamos TU función original (la que sí sabe sincronizar Curios en tu entorno)
      const stacksOrItem = global.getItemFromSlot(entity, slotName);
      if (!stacksOrItem) return false;

      // 3. Tu lógica exacta del Script 1 para desempaquetar Curios
      const item = slotName.startsWith("curios:")
        ? stacksOrItem.getStackInSlot(0)
        : stacksOrItem;
      if (!item || item.isEmpty() || !item.nbt) return false;

      // 4. Tu lectura nativa de JavaScript (la que reacciona perfecto con tu JSON y el NOT)
      const actualValue = item.nbt[nbtKey];
      if (actualValue == null) return false;

      // 5. Tu switch original intacto
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