// Archivo: kubejs/startup_scripts/palladium_condition_slot_nbt_check.js

StartupEvents.registry("palladium:condition_serializer", (event) => {
  event
    .create("satsu_iron_man_addon:slot_nbt_check")
    .addProperty(
      "slot",
      "string",
      "mainhand",
      "Slot to check (mainhand, offhand, boots, leggings, chestplate, helmet)",
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

      const item = entity.getItemBySlot(slotName);
      if (!item || item.isEmpty() || !item.nbt) return false;

      const actualValue = item.nbt[nbtKey];
      if (actualValue == null) return false;

      switch (mode) {
        case "equals":
          // Coincidencia exacta (tipo y valor)
          return actualValue === nbtValue;

        case "notEquals":
          // Existe la clave pero con valor distinto
          return actualValue !== nbtValue;

        case "exists":
          // Solo importa que la clave exista, sin importar el valor
          return true;

        case "contains":
          // Si es string, revisa si contiene el valor esperado
          if (typeof actualValue === "string") {
            return actualValue.includes(nbtValue);
          }
          return false;

        case "numericEquals":
          // Comparación numérica flexible (42 vs "42")
          return Number(actualValue) === Number(nbtValue);

        default:
          return false;
      }
    });
});
