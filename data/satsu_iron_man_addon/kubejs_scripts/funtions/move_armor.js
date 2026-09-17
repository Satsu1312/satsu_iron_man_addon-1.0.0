PlayerEvents.tick(event => {
  const { player, level } = event;

  if (level.isClientSide()) return;

  let armorSlots = [
    player.getItemBySlot('head'),
    player.getItemBySlot('chest'),
    player.getItemBySlot('legs'),
    player.getItemBySlot('feet')
  ];

  for (let i = 0; i < armorSlots.length; i++) {
    let armorItem = armorSlots[i];

    // Verificamos si tiene el tag principal o el nuevo tag de las Hulkbusters
    let matchesArmorTag = armorItem.hasTag('satsu_iron_man_addon:armors/main') || armorItem.hasTag('satsu_iron_man_addon:armors/iron_man/hulkbusters/main');

    if (!armorItem.isEmpty() && matchesArmorTag) {
      
      // Bypass para el Mark 01 de pecho para que se quede en el slot de armadura vainilla
      if (armorItem.id == 'satsu_iron_man_addon:marks/mark_01/mark_01_chest') {
        continue;
      }

      try {
        let hasCuriosTag = armorItem.hasTag('curios:armor') || armorItem.hasTag('curios:curio') || armorItem.id.contains('bracelet') || armorItem.id.contains('mark');

        if (hasCuriosTag) {
          let itemCopy = armorItem.copy();
          armorItem.setCount(0);
          player.give(itemCopy);
          player.playSound('item.armor.equip_generic', 1.0, 1.0);
        }
      } catch(e) {
        // Silencioso ante errores
      }
    }
  }
});