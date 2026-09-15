BlockEvents.rightClicked('satsu_iron_man_addon:reactor_ark_recharge_on', event => {
    let { block, player, hand, item } = event;

    if (hand != 'MAIN_HAND') return;

    let posKey = `${block.x},${block.y},${block.z},${block.level.dimension}`;
    let serverData = Utils.server.persistentData;
    serverData.reactorStorage = serverData.reactorStorage || {};
    let storage = serverData.reactorStorage;

    let hasItem = storage[posKey] != undefined;

    if (!hasItem && !item.isEmpty()) {
        let validTag1 = item.hasTag('satsu_iron_man_addon:armors/main');
        let validTag2 = item.hasTag('satsu_iron_man_addon:armors/iron_man/hulkbusters/main');

        if (!validTag1 && !validTag2) return;

        storage[posKey] = {
            id: item.id,
            count: 1,
            nbt: item.nbt ? item.nbt.copy() : null
        };

        item.count--;
        
        // Forzamos al cliente a sincronizar el inventario completo (el slot seleccionado)
        player.sendData('update_inventory');
        player.inventory.selectedHotbarSlot = player.inventory.selectedHotbarSlot;

        event.cancel();

    } else if (hasItem && item.isEmpty()) {
        let savedData = storage[posKey];

        let recoveredItem = Item.of(savedData.id, savedData.count);
        if (savedData.nbt) {
            recoveredItem.nbt = savedData.nbt;
        }

        player.setHeldItem(hand, recoveredItem);
        delete storage[posKey];
        
        event.cancel();
    }
});

LevelEvents.tick(event => {
    let level = event.level;
    if (level.isClientSide()) return;
    // Se eliminó la validación del módulo de 20 para que corra en cada tick

    let serverData = Utils.server.persistentData;
    let storage = serverData.reactorStorage;
    if (!storage) return;

    let currentDim = level.dimension.toString();

    for (let posKey in storage) {
        let parts = posKey.split(',');
        let dim = parts[3];
        if (dim !== currentDim) continue;

        let x = parseInt(parts[0]);
        let y = parseInt(parts[1]);
        let z = parseInt(parts[2]);

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
                
                let chargeRate = savedData.nbt.contains('Energy_Charge') ? savedData.nbt.getDouble('Energy_Charge') : 10.0;
                
                if (currentEnergy < maxEnergy) {
                    let nuevaEnergia = currentEnergy + chargeRate;
                    savedData.nbt.putDouble('Energy', nuevaEnergia);
                }
            } catch(e) {}
        }
    }
});