(function () {
  const CuriosApi = Java.loadClass("top.theillusivec4.curios.api.CuriosApi");
  const ItemStack = Java.loadClass("net.minecraft.world.item.ItemStack");
  const ForgeRegistries = Java.loadClass(
    "net.minecraftforge.registries.ForgeRegistries",
  );
  const ROOT_KEY = "satsu_iron_man_addon:curios_slot_durability";

  function getContainer(entity, slot) {
    if (!entity || !entity.isLiving()) return null;

    // .orElse(null) maneja LazyOptional y Optional de forma segura sin llamar a isEmpty()
    let handler = CuriosApi.getCuriosHelper()
      .getCuriosHandler(entity)
      .orElse(null);
    if (!handler) return null;

    let stacksHandler = handler.getStacksHandler(slot).orElse(null);
    if (!stacksHandler) return null;

    return stacksHandler.getStacks();
  }

  StartupEvents.registry("palladium:abilities", (event) => {
    event
      .create("satsu_iron_man_addon:curios_slot_durability")
      .tick((entity, entry, holder, enabled) => {
        if (!entity || !entity.isPlayer()) return;

        let pData = entity.persistentData;
        let slot = String(entry.getPropertyByName("curios_slot"));
        let root = pData.getCompound(ROOT_KEY);

        if (enabled) {
          let loss = parseInt(entry.getPropertyByName("durability_loss")) || 1;
          let items = entry.getPropertyByName("items") || [];

          let slotTag = root.getCompound(slot);
          slotTag.putInt("loss", loss);

          let list = slotTag.getList("allowedItems", 8);
          list.clear();
          items.forEach(function (id) {
            list.add(String(id));
          });
          slotTag.put("allowedItems", list);

          root.put(slot, slotTag);
          pData.put(ROOT_KEY, root);

          let container = getContainer(entity, slot);
          if (container) {
            for (let i = 0; i < container.slots; i++) {
              let item = container.getStackInSlot(i);
              if (
                !item.isEmpty() &&
                item.maxDamage > 0 &&
                item.damageValue >= item.maxDamage
              ) {
                container.setStackInSlot(i, ItemStack.EMPTY);
              }
            }
          }
        } else if (root.contains(slot)) {
          root.remove(slot);
          if (root.isEmpty()) pData.remove(ROOT_KEY);
        }
      });
  });

  ForgeEvents.onEvent(
    "net.minecraftforge.event.entity.living.LivingHurtEvent",
    (event) => {
      let entity = event.getEntity();
      if (!entity || !entity.isPlayer()) return;

      let pData = entity.persistentData;
      if (!pData.contains(ROOT_KEY)) return;

      let root = pData.getCompound(ROOT_KEY);

      let keys = root.getAllKeys();
      for (let i = 0; i < keys.size(); i++) {
        let slot = keys.toArray()[i];
        let slotTag = root.getCompound(slot);
        let loss = slotTag.getInt("loss");
        let allowedItems = slotTag.getList("allowedItems", 8);

        let container = getContainer(entity, slot);
        if (!container) continue;

        for (let j = 0; j < container.slots; j++) {
          let item = container.getStackInSlot(j);
          if (item.isEmpty() || item.maxDamage <= 0) continue;

          if (allowedItems.size() > 0) {
            let regName = ForgeRegistries.ITEMS.getKey(item.item).toString();
            if (!allowedItems.contains(regName)) continue;
          }

          let newDamage = item.damageValue + loss;
          item.damageValue = Math.min(newDamage, item.maxDamage);
        }
      }
    },
  );
})();
