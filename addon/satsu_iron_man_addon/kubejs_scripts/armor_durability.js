// Credits to Spring
StartupEvents.registry("palladium:condition_serializer", (event) => {
  event
    .create("satsu_iron_man_addon:armor_durability")
    .addProperty("armor_piece", "integer", 1, "0 = boots, 1 = leggings, 2 = chestplate, 3 = helmet")
    .addProperty("divider", "float", 1.0, "Division factor for durability check")
    .addProperty("operation_type", "string", ">=", "Valid operators: >, >=, <, <=")
    .test((entity, properties) => {
      const armor_piece = properties.get("armor_piece");
      const divider = properties.get("divider");
      const operation_type = properties.get("operation_type");

      if (!entity.getInventory || divider <= 0) return false;

      const slot = entity.getInventory().getArmor(armor_piece);
      if (slot.isEmpty()) return false;

      const maxDurability = slot.maxDamage;
      const currentDamage = slot.damageValue;
      const durabilityLeft = maxDurability - currentDamage;
      const requiredDurability = maxDurability / divider;

      // Mapeo de operadores a funciones
      const ops = {
        ">=": (a, b) => a >= b,
        ">":  (a, b) => a > b,
        "<=": (a, b) => a <= b,
        "<":  (a, b) => a < b,
      };

      return ops[operation_type]
        ? ops[operation_type](durabilityLeft, requiredDurability)
        : false;
    });
});