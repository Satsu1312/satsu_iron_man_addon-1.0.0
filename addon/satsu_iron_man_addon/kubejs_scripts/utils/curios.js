// utils/curios.js

const CuriosApi = Java.loadClass("top.theillusivec4.curios.api.CuriosApi");
global.getItemFromSlot = function (entity, slotName) {
  if (slotName.startsWith("curios:")) {
    const curiosSlot = slotName.split(":")[1];
    const handler = CuriosApi.getCuriosHelper()
      .getCuriosHandler(entity)
      .orElse(null);
    if (!handler) return null;
    const stacks = handler.getStacksHandler(curiosSlot).orElse(null);
    if (!stacks) return null;
    return stacks.getStacks();
  }
  return entity.getItemBySlot(slotName);
};

global.setItemInSlot = function (entity, slotName, newItem, slotIndex = 0) {
  const slotMap = { feet: 36, legs: 37, chest: 38, head: 39 };

  if (slotName.startsWith("curios:")) {
    const curiosSlot = slotName.split(":")[1];
    const handler = CuriosApi.getCuriosHelper()
      .getCuriosHandler(entity)
      .orElse(null);
    if (!handler) return;
    const stacks = handler.getStacksHandler(curiosSlot).orElse(null);
    if (!stacks) return;
    stacks.getStacks().setStackInSlot(slotIndex, newItem);
  } else if (entity.inventory && slotMap[slotName]) {
    entity.inventory.setItem(slotMap[slotName], newItem);
  } else {
    entity.setItemSlot(slotName, newItem);
  }
};
