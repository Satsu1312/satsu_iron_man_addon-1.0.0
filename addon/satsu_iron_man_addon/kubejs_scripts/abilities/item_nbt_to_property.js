StartupEvents.registry("palladium:abilities", (event) => {
  event
    .create("satsu_iron_man_addon:item_nbt_to_property")
    .icon(palladium.createItemIcon("minecraft:stick"))
    .addProperty(
      "slot",
      "string",
      "mainhand",
      "Slot to check (mainhand, offhand, feet, legs, chest, head, curios:slot)",
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
      let item;

      if (slotName.startsWith("curios:")) {
        const CuriosApi = Java.loadClass(
          "top.theillusivec4.curios.api.CuriosApi",
        );
        const curiosSlot = slotName.split(":")[1];
        const handler = CuriosApi.getCuriosHelper()
          .getCuriosHandler(entity)
          .orElse(null);
        if (!handler) return;
        const stacks = handler.getStacksHandler(curiosSlot).orElse(null);
        if (!stacks) return;
        item = stacks.getStacks().getStackInSlot(0);
      } else {
        item = entity.getItemBySlot(slotName);
      }

      if (!item?.nbt || item.isEmpty()) return;

      const nbtKey = entry.getPropertyByName("nbtKey");
      const propertyKey = entry.getPropertyByName("propertyKey");
      const rawValue = item.nbt[nbtKey];
      if (rawValue == null) return;

      const value = isNaN(Number(rawValue))
        ? String(rawValue)
        : Number(rawValue);
      palladium.setProperty(entity, propertyKey, value);
    });
});
