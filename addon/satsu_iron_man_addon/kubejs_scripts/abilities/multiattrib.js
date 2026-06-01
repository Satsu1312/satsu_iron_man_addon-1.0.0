let UUID = Java.loadClass("java.util.UUID");

StartupEvents.registry("palladium:abilities", (event) => {
  event
    .create("satsu_iron_man_addon:multi_attribute_modifier")
    .icon(palladium.createItemIcon("minecraft:golden_apple"))
    .documentationDescription(
      "Apply multiple attribute modifiers to the player when active."
    )
    .addProperty("attributes", "string_array", [], "List of attribute IDs")
    .addProperty("amounts", "string_array", [], "List of values")
    .addProperty("operations", "string_array", [], "List of operations")
    .addProperty("uuids", "string_array", [], "List of UUIDs")
    .addProperty("dummy", "string", "0", "Does nothing, order alignment only")

    .tick((entity, entry, holder, enabled) => {
      if (!enabled || !entity.isPlayer()) return;

      const toArray = (prop) => (prop ? Array.from(prop) : []);
      const attributes = toArray(entry.getPropertyByName("attributes"));
      const amounts = toArray(entry.getPropertyByName("amounts"));
      const operations = toArray(entry.getPropertyByName("operations"));
      const uuids = toArray(entry.getPropertyByName("uuids"));

      // Validación de longitud
      if (
        attributes.length !== amounts.length ||
        attributes.length !== operations.length ||
        attributes.length !== uuids.length
      ) {
        holder.setEnabled(false);
        return;
      }

      attributes.forEach((attrId, i) => {
        const amount = parseFloat(amounts[i]);
        const operation = operations[i].toUpperCase();
        const uuidObj = UUID.fromString(uuids[i]);

        if (entity.getAttribute(attrId)) {
          entity.modifyAttribute(attrId, uuidObj, amount, operation);
        }
      });
    })

    .lastTick((entity, entry) => {
      if (!entity.isPlayer()) return;

      const toArray = (prop) => (prop ? Array.from(prop) : []);
      const attributes = toArray(entry.getPropertyByName("attributes"));
      const uuids = toArray(entry.getPropertyByName("uuids"));

      attributes.forEach((attrId, i) => {
        if (i < uuids.length) {
          const uuidObj = UUID.fromString(uuids[i]);
          entity.removeAttribute(attrId, uuidObj);
        }
      });
    });
});