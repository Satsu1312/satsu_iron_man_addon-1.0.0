StartupEvents.registry("palladium:abilities", (event) => {
  event
    .create("satsu_iron_man_addon:item_nbt_modifier")
    .icon(palladium.createItemIcon("minecraft:diamond"))
    .addProperty(
      "slot",
      "string",
      "mainhand",
      "Slot to check (mainhand, offhand, feet, legs, chest, head, curios:slot)",
    )
    .addProperty("nbtKey", "string", "CustomTag", "The NBT key to modify")
    .addProperty(
      "nbtValue",
      "string",
      "Active",
      "The value to set for the NBT key",
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
        const handlerOpt = CuriosApi.getCuriosHelper().getCuriosHandler(entity);
        const handler = handlerOpt.orElse(null);
        if (!handler) return;

        const stacksOpt = handler.getStacksHandler(curiosSlot);
        const stacks = stacksOpt.orElse(null);
        if (!stacks) return;

        item = stacks.getStacks().getStackInSlot(0);
      } else {
        item = entity.getItemBySlot(slotName);
      }

      if (!item || item.isEmpty()) return;

      const nbtKey = entry.getPropertyByName("nbtKey");
      const nbtValue = entry.getPropertyByName("nbtValue");
      const itemNBT = item.nbt ?? {};

      if (itemNBT[nbtKey] === nbtValue) return;

      itemNBT[nbtKey] = nbtValue;
      const newItem = item.withNBT(itemNBT);

      const slotMap = { feet: 36, legs: 37, chest: 38, head: 39 };
      if (slotName.startsWith("curios:")) {
        const CuriosApi = Java.loadClass(
          "top.theillusivec4.curios.api.CuriosApi",
        );
        const curiosSlot = slotName.split(":")[1];
        const handlerOpt = CuriosApi.getCuriosHelper().getCuriosHandler(entity);
        const handler = handlerOpt.orElse(null);
        if (!handler) return;

        const stacksOpt = handler.getStacksHandler(curiosSlot);
        const stacks = stacksOpt.orElse(null);
        if (!stacks) return;

        stacks.getStacks().setStackInSlot(0, newItem);
      } else if (entity.inventory && slotMap[slotName]) {
        entity.inventory.setItem(slotMap[slotName], newItem);
      } else {
        entity.setItemSlot(slotName, newItem);
      }
    });
});
