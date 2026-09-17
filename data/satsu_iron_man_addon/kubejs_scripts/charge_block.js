BlockEvents.rightClicked('satsu_iron_man_addon:reactor_ark_recharge_on', event => {
    let { block, player, hand, item } = event;

    if (hand != 'MAIN_HAND') return;

    let posKey = `${block.x},${block.y},${block.z},${block.level.dimension}`;
    let serverData = Utils.server.persistentData;
    serverData.reactorStorage = serverData.reactorStorage || {};
    let storage = serverData.reactorStorage;

    let hasItem = storage[posKey] != undefined;
    console.info(`[Reactor Log] Clic derecho detectado en bloque. ¿Ya tiene ítem guardado?: ${hasItem} | Ítem en mano: ${item.id}`);

    if (!hasItem && !item.isEmpty()) {
        let validTag1 = item.hasTag('satsu_iron_man_addon:armors/main');
        let validTag2 = item.hasTag('satsu_iron_man_addon:armors/iron_man/hulkbusters/main');

        console.info(`[Reactor Log] Validando tags -> ¿Tag main?: ${validTag1} | ¿Tag hulkbusters?: ${validTag2}`);

        if (!validTag1 && !validTag2) {
            console.info(`[Reactor Log] El ítem no tiene los tags requeridos, se ignora.`);
            return;
        }

        storage[posKey] = {
            id: item.id,
            count: 1,
            nbt: item.nbt ? item.nbt.copy() : null
        };

        console.info(`[Reactor Log] Ítem guardado en storage: ${item.id}. Vaciando la mano de forma limpia.`);
        
        // Vaciamos la mano usando setHeldItem en lugar de item.count-- para evitar desincronización
        player.setHeldItem(hand, Air.of()); 
        
        if (player.inventory && typeof player.inventory.sendChanges === 'function') {
            player.inventory.sendChanges();
            console.info(`[Reactor Log] Sincronización de inventario forzada.`);
        }

        event.cancel();

    } else if (hasItem && item.isEmpty()) {
        let savedData = storage[posKey];
        console.info(`[Reactor Log] Recuperando ítem del reactor: ${savedData.id}`);

        let recoveredItem = Item.of(savedData.id, savedData.count);
        if (savedData.nbt) {
            recoveredItem.nbt = savedData.nbt;
        }

        player.setHeldItem(hand, recoveredItem);
        delete storage[posKey];
        
        if (player.inventory && typeof player.inventory.sendChanges === 'function') {
            player.inventory.sendChanges();
            console.info(`[Reactor Log] Ítem entregado a la mano y inventario sincronizado.`);
        }

        event.cancel();
    } else {
        console.info(`[Reactor Log] Condición no cumplida (hasItem: ${hasItem}, ítem en mano vacío?: ${item.isEmpty()})`);
    }
});

LevelEvents.tick(event => {
    let level = event.level;
    if (level.isClientSide()) return;

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

BlockEvents.broken('satsu_iron_man_addon:reactor_ark_recharge_on', event => {
    let { block, level } = event;
    if (level.isClientSide()) return;

    let posKey = `${block.x},${block.y},${block.z},${level.dimension}`;
    let serverData = Utils.server.persistentData;
    let storage = serverData.reactorStorage;

    if (!storage || !storage[posKey]) return;

    let savedData = storage[posKey];
    console.info(`[Reactor Log] Bloque roto. Soltando ítem guardado: ${savedData.id}`);

    let droppedItem = Item.of(savedData.id, savedData.count);
    if (savedData.nbt) {
        droppedItem.nbt = savedData.nbt;
    }

    let itemEntity = level.createEntity('item');
    itemEntity.x = block.x + 0.5;
    itemEntity.y = block.y + 0.5;
    itemEntity.z = block.z + 0.5;
    itemEntity.item = droppedItem;
    itemEntity.spawn();

    delete storage[posKey];
});