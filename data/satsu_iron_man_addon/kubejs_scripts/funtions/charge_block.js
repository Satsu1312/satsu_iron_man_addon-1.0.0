function syncPlayerInventory(player) {
    if (player.containerMenu) player.containerMenu.sendAllDataToRemote();
    if (player.inventory && typeof player.inventory.sendChanges === 'function') {
        player.inventory.sendChanges();
    }
}

BlockEvents.rightClicked('satsu_iron_man_addon:reactor_ark_recharge_on', event => {
    let { block, player, hand, item, level } = event;

    if (hand !== 'MAIN_HAND') return;

    let posKey = `${block.x},${block.y},${block.z},${level.dimension}`;
    let storage = Utils.server.persistentData.reactorStorage || {};
    Utils.server.persistentData.reactorStorage = storage;

    let hasItem = storage[posKey] !== undefined;

    if (!hasItem && !item.isEmpty()) {
        if (!item.hasTag('satsu_iron_man_addon:armors/main') && !item.hasTag('satsu_iron_man_addon:armors/iron_man/hulkbusters/main')) {
            return;
        }

        storage[posKey] = {
            id: item.id,
            count: 1,
            nbt: item.nbt ? item.nbt.copy() : null
        };

        item.count = 0;
        level.playSound(null, block.x + 0.5, block.y + 0.5, block.z + 0.5, 'block.end_portal_frame.fill', 'blocks', 1.0, 1.0);
        syncPlayerInventory(player);
        event.cancel();

    } else if (hasItem && item.isEmpty()) {
        let savedData = storage[posKey];
        let recoveredItem = Item.of(savedData.id, savedData.count);
        
        if (savedData.nbt) {
            recoveredItem.nbt = savedData.nbt;
        }

        player.setHeldItem(hand, recoveredItem);
        delete storage[posKey];
        
        level.playSound(null, block.x + 0.5, block.y + 0.5, block.z + 0.5, 'block.end_portal_frame.fill', 'blocks', 1.0, 1.0);
        syncPlayerInventory(player);
        event.cancel();
    }
});

LevelEvents.tick(event => {
    let level = event.level;
    if (level.isClientSide()) return;

    let storage = Utils.server.persistentData.reactorStorage;
    if (!storage) return;

    let currentDim = level.dimension.toString();

    for (let posKey in storage) {
        let parts = posKey.split(',');
        if (parts[3] !== currentDim) continue;

        let x = parseInt(parts[0], 10);
        let y = parseInt(parts[1], 10);
        let z = parseInt(parts[2], 10);

        let block = level.getBlock(x, y, z);
        if (block.id !== 'satsu_iron_man_addon:reactor_ark_recharge_on') {
            delete storage[posKey];
            continue;
        }

        let savedData = storage[posKey];
        if (savedData && savedData.nbt) {
            try {
                let currentEnergy = savedData.nbt.contains('Energy') ? savedData.nbt.getDouble('Energy') : 0.0;
                let maxEnergy = 10000000.0;
                
                if (currentEnergy < maxEnergy) {
                    let chargeRate = savedData.nbt.contains('Energy_Charge') ? savedData.nbt.getDouble('Energy_Charge') : 10.0;
                    savedData.nbt.putDouble('Energy', currentEnergy + chargeRate);
                }
            } catch (e) {}
        }
    }
});

BlockEvents.broken('satsu_iron_man_addon:reactor_ark_recharge_on', event => {
    let { block, level } = event;
    if (level.isClientSide()) return;

    let posKey = `${block.x},${block.y},${block.z},${level.dimension}`;
    let storage = Utils.server.persistentData.reactorStorage;

    if (!storage || !storage[posKey]) return;

    let savedData = storage[posKey];
    let droppedItem = Item.of(savedData.id, savedData.count);
    
    if (savedData.nbt) {
        droppedItem.nbt = savedData.nbt;
    }

    let itemEntity = level.createEntity('item');
    itemEntity.setPosition(block.x + 0.5, block.y + 0.5, block.z + 0.5);
    itemEntity.item = droppedItem;
    itemEntity.spawn();

    delete storage[posKey];
});