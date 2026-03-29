// Archivo: kubejs/startup_scripts/palladium_nbt_to_property.js

StartupEvents.registry("palladium:abilities", (event) => {
  event
    .create("satsu_iron_man_addon:item_nbt_to_property")
    .icon(palladium.createItemIcon("minecraft:stick"))
    .addProperty(
      "slot",
      "string",
      "mainhand",
      "Slot to check (mainhand, offhand, boots, leggings, chestplate, helmet)",
    )
    .addProperty("nbtKey", "string", "skillCharge", "The NBT key to read")
    .addProperty(
      "propertyKey",
      "string",
      "satsu_iron_man_addon_mod.skill_charge",
      "The Palladium property to set",
    )
    .tick((entity, entry, holder, enabled) => {
      if (!enabled) return;

      const slotName = entry.getPropertyByName("slot");
      const nbtKey = entry.getPropertyByName("nbtKey");
      const propertyKey = entry.getPropertyByName("propertyKey");

      const item = entity.getItemBySlot(slotName);
      if (!item || item.isEmpty() || !item.nbt) return;

      const itemNBT = item.nbt;
      if (itemNBT[nbtKey] == null) return;

      const rawValue = itemNBT[nbtKey];

      // Detectar si es número o string
      let value;
      if (!isNaN(Number(rawValue))) {
        value = Number(rawValue); // numérico
      } else {
        value = String(rawValue); // texto
      }

      // Asignar directamente la propiedad con el tipo detectado
      palladium.setProperty(entity, propertyKey, value);
    });
});
