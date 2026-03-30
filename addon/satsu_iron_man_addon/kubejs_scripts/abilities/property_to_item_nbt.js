StartupEvents.registry("palladium:abilities", (event) => {
  event
    .create("satsu_iron_man_addon:property_to_item_nbt")
    .icon(palladium.createItemIcon("minecraft:stick"))
    .addProperty(
      "slot",
      "string",
      "mainhand",
      "Slot to check (mainhand, offhand, feet, legs, chest, head, curios:slot)",
    )
    .addProperty("nbtKey", "string", "skillCharge", "The NBT key to set")
    .addProperty(
      "propertyKey",
      "string",
      "satsu_iron_man_addon_mod.skill_charge",
      "The Palladium property to read",
    )

    .tick((entity, entry, holder, enabled) => {
      if (!enabled) return;

      const slotName = entry.getPropertyByName("slot");
      const nbtKey = entry.getPropertyByName("nbtKey");
      const propertyKey = entry.getPropertyByName("propertyKey");

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

      if (!item || item.isEmpty()) return;

      const propertyValue = palladium.getProperty(entity, propertyKey);
      if (propertyValue == null) return;

      const itemNBT = item.nbt ?? {};
      if (itemNBT[nbtKey] === propertyValue) return;

      itemNBT[nbtKey] = propertyValue;
      const newItem = item.withNBT(itemNBT);

      const slotMap = { feet: 36, legs: 37, chest: 38, head: 39 };
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
        stacks.getStacks().setStackInSlot(0, newItem);
      } else if (entity.inventory && slotMap[slotName]) {
        entity.inventory.setItem(slotMap[slotName], newItem);
      } else {
        entity.setItemSlot(slotName, newItem);
      }
    });
});
