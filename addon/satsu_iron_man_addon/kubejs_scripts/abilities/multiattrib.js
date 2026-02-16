let UUID = Java.loadClass("java.util.UUID");
StartupEvents.registry("palladium:abilities", (event) => {
  event
    .create("satsu_iron_man_addon:multi_attribute_modifier")
    .icon(palladium.createItemIcon("minecraft:golden_apple"))
    .addProperty(
      "attributes",
      "string_array",
      [],
      'List of attributes Example ["minecraft:generic.max_health", "minecraft:generic.attack_damage"].'
    )
    .addProperty(
      "amounts",
      "string_array",
      [],
      'List of values Example ["10", "5"].'
    )
    .addProperty(
      "operations",
      "string_array",
      [],
      'List of operations. Example ["addition", "multiply_total", "multiply_base"].'
    )
    .addProperty(
      "uuids",
      "string_array",
      [],
      'List of UUIDs. Example ["UUID-1", "UUID-2"].'
    )
    .addProperty(
      "dummy",
      "string",
      "0",
      "Does nothing, Order must match attributes."
    )
    .tick((entity, entry, holder, enabled) => {
      if (!enabled || !entity.isPlayer()) {
        return;
      }
      let propAttributes = entry.getPropertyByName("attributes");
      let propAmounts = entry.getPropertyByName("amounts");
      let propOperations = entry.getPropertyByName("operations");
      let propUuids = entry.getPropertyByName("uuids");
      let attributes = propAttributes ? Array.from(propAttributes) : [];
      let amounts = propAmounts ? Array.from(propAmounts) : [];
      let operations = propOperations ? Array.from(propOperations) : [];
      let uuids = propUuids ? Array.from(propUuids) : [];
      if (
        attributes.length !== amounts.length ||
        attributes.length !== operations.length ||
        attributes.length !== uuids.length
      ) {
        holder.setEnabled(false);
        return;
      }
      for (let i = 0; i < attributes.length; i++) {
        let attrId = attributes[i];
        let amountStr = amounts[i];
        let opStr = operations[i];
        let uuidStr = uuids[i];
        let amount = parseFloat(amountStr);
        let operation = opStr.toUpperCase();
        let uuidObj = UUID.fromString(uuidStr);
        if (!entity.getAttribute(attrId)) {
          continue;
        }
        entity.modifyAttribute(attrId, uuidObj, amount, operation);
      }
    })
    .lastTick((entity, entry, holder) => {
      if (!entity.isPlayer()) return;
      let propAttributes = entry.getPropertyByName("attributes");
      let jUuids = entry.getPropertyByName("uuids");
      let attributes = propAttributes ? Array.from(propAttributes) : [];
      let uuids = jUuids ? Array.from(jUuids) : [];
      for (let i = 0; i < attributes.length; i++) {
        if (i >= uuids.length) break;
        let attrId = attributes[i];
        let uuidStr = uuids[i];
        let uuidObj = UUID.fromString(uuidStr);
        entity.removeAttribute(attrId, uuidObj);
      }
    });
});
//Made by MrFuuu
