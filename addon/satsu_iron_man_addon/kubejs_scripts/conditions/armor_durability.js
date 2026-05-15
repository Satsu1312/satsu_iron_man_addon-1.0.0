// Credits to Spring
StartupEvents.registry("palladium:condition_serializer", (event) => {
  event
    .create("satsu_iron_man_addon:armor_durability")
    .addProperty("armor_piece", "integer", 1, "0 = boots, 1 = leggings, 2 = chestplate, 3 = helmet")
    .addProperty("divider", "float", 1.0, "Division factor for durability check")
    .addProperty("operation_type", "string", ">=", "Valid operators: >, >=, <, <=")
    .test((entity, props) => {
      const armorPiece = props.get("armor_piece");
      const divider = props.get("divider");
      const opType = props.get("operation_type");

      if (!entity.getInventory || divider <= 0) return false;

      const slot = entity.getInventory().getArmor(armorPiece);
      if (slot.isEmpty()) return false;

      const maxDurability = slot.maxDamage;
      const durabilityLeft = maxDurability - slot.damageValue;
      const requiredDurability = maxDurability / divider;

      // Operadores como funciones
      const ops = {
        ">=": (a, b) => a >= b,
        ">":  (a, b) => a > b,
        "<=": (a, b) => a <= b,
        "<":  (a, b) => a < b,
      };

      const opFn = ops[opType];
      return opFn ? opFn(durabilityLeft, requiredDurability) : false;
    });
});