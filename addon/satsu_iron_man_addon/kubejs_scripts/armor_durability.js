//Credits to Spring
StartupEvents.registry("palladium:condition_serializer", (event) => {
  event
    .create("satsu_iron_man_addon:armor_durability")
    .addProperty(
      "armor_piece",
      "integer",
      1,
      "0 = boots, 1 = leggings, 2 = chestplate, 3 = helmet"
    )
    .addProperty(
      "divider",
      "float",
      1.0,
      "this part is made to decide what value you are searching with division"
    )
    .addProperty(
      "operation_type",
      "string",
      ">=",
      "all the possible sign : > , >= , < , <="
    )
    .test((entity, properties) => {
      const armor_piece = properties.get("armor_piece");
      const divider = properties.get("divider");
      const operation_type = properties.get("operation_type");
      if (entity.getInventory != null) {
        const slot = entity.getInventory().getArmor(armor_piece);
    
      if (!slot.isEmpty() && divider > 0) {
        const maxDurability = slot.maxDamage;
        const currentDamage = slot.damageValue;
        const durabilityLeft = maxDurability - currentDamage;
        const requiredDurability = maxDurability / divider;
        if (operation_type == ">=") {
          return durabilityLeft >= requiredDurability;
        } else if (operation_type == ">") {
          return durabilityLeft > requiredDurability;
        } else if (operation_type == "<=") {
          return durabilityLeft <= requiredDurability;
        } else if (operation_type == "<") {
          return durabilityLeft < requiredDurability;
        }
      }
      }
      return false;
    });
});
