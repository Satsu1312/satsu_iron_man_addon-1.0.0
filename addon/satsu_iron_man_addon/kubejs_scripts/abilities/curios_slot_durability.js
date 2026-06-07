(function () {
  const CuriosApi = Java.loadClass("top.theillusivec4.curios.api.CuriosApi");
  const CompoundTag = Java.loadClass("net.minecraft.nbt.CompoundTag");
  const ItemStack = Java.loadClass("net.minecraft.world.item.ItemStack");

  const ROOT_KEY = "satsu_iron_man_addon:curios_slot_durability";

  function getRoot(pData) {
    if (!pData.contains(ROOT_KEY)) pData.put(ROOT_KEY, new CompoundTag());
    return pData.getCompound(ROOT_KEY);
  }

  function getContainer(entity, slot) {
    let handler = CuriosApi.getCuriosHelper().getCuriosHandler(entity).orElse(null);
    if (!handler) return null;
    let stacks = handler.getStacksHandler(slot).orElse(null);
    if (!stacks) return null;
    return stacks.getStacks();
  }

  StartupEvents.registry("palladium:abilities", (event) => {
    event
      .create("satsu_iron_man_addon:curios_slot_durability")
      .icon(palladium.createItemIcon("minecraft:shield"))
      .documentationDescription(
        "Items in a specified Curios slot lose durability when the player takes damage, like armor.",
      )
      .addProperty(
        "curios_slot",
        "string",
        "ring",
        'Curios slot ID to watch (e.g. "ring", "belt", "satsu_iron_man_addon_outerwear")',
      )
      .addProperty(
        "items",
        "string_array",
        [],
        'Item IDs that should lose durability (e.g. ["satsu_iron_man_addon:my_ring"]). Leave empty to affect every damageable item in the slot.',
      )
      .addProperty(
        "durability_loss",
        "integer",
        1,
        "Durability points removed per damage event",
      )
      .tick((entity, entry, holder, enabled) => {
        if (!entity || !entity.isPlayer()) return;

        let pData = entity.getPersistentData();
        let slot = String(entry.getPropertyByName("curios_slot"));

        if (enabled) {
          let root = getRoot(pData);
          let slotTag = new CompoundTag();
          slotTag.putInt(
            "loss",
            parseInt(entry.getPropertyByName("durability_loss")) || 1,
          );
          let items = Array.from(entry.getPropertyByName("items") || []);
          slotTag.putString("items", items.join(","));
          root.put(slot, slotTag);
          
          let container = getContainer(entity, slot);
          if (container) {
            for (let i = 0; i < container.getSlots(); i++) {
              let item = container.getStackInSlot(i);
              if (
                item &&
                !item.isEmpty() &&
                item.getMaxDamage() > 0 &&
                item.getDamageValue() >= item.getMaxDamage()
              ) {
                container.setStackInSlot(i, ItemStack.EMPTY);
              }
            }
          }
        } else {
          if (!pData.contains(ROOT_KEY)) return;
          let root = pData.getCompound(ROOT_KEY);
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

      let pData = entity.getPersistentData();
      if (!pData.contains(ROOT_KEY)) return;

      let root = pData.getCompound(ROOT_KEY);
      let keys = root.getAllKeys();
      if (keys.isEmpty()) return;

      for (let slot of keys) {
        let slotTag = root.getCompound(slot);
        let container = getContainer(entity, slot);
        if (!container) continue;

        let loss = slotTag.getInt("loss") || 1;
        let itemsRaw = slotTag.getString("items");
        let allowedItems = itemsRaw ? itemsRaw.split(",").filter(Boolean) : [];

        for (let i = 0; i < container.getSlots(); i++) {
          let item = container.getStackInSlot(i);
          if (!item || item.isEmpty() || item.getMaxDamage() <= 0) continue;

          if (allowedItems.length > 0) {
            let itemId = item.getItem().builtInRegistryHolder().key().location().toString();
            if (!allowedItems.includes(itemId)) continue;
          }
          
          let newDamage = item.getDamageValue() + loss;
          item.setDamageValue(Math.min(newDamage, item.getMaxDamage()));
        }
      }
    },
  );
})();