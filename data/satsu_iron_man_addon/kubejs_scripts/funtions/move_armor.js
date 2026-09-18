const ARMOR_SLOTS = ['head', 'chest', 'legs', 'feet'];

PlayerEvents.tick(event => {
    let { player, level } = event;

    if (level.isClientSide()) return;

    for (let slotName of ARMOR_SLOTS) {
        let armorItem = player.getItemBySlot(slotName);

        if (armorItem.isEmpty()) continue;

        if (armorItem.id === 'satsu_iron_man_addon:marks/mark_01/mark_01_chest') {
            continue;
        }

        let matchesArmorTag = armorItem.hasTag('satsu_iron_man_addon:armors/main') || 
                              armorItem.hasTag('satsu_iron_man_addon:armors/iron_man/hulkbusters/main');

        if (!matchesArmorTag) continue;

        try {
            let hasCuriosTag = armorItem.hasTag('curios:armor') || 
                               armorItem.hasTag('curios:curio') || 
                               armorItem.id.contains('bracelet') || 
                               armorItem.id.contains('mark');

            if (hasCuriosTag) {
                let itemCopy = armorItem.copy();
                armorItem.setCount(0);
                player.give(itemCopy);
                player.playSound('item.armor.equip_generic', 1.0, 1.0);
            }
        } catch (e) {}
    }
});