BlockEvents.rightClicked('satsu_iron_man_addon:reactor_ark_recharge_on', event => {
    let { block, player, hand, item } = event;

    if (hand != 'MAIN_HAND') return;

    let posKey = `${block.x},${block.y},${block.z},${block.level.dimension}`;
    let serverData = Utils.server.persistentData;
    serverData.reactorStorage = serverData.reactorStorage || {};
    let storage = serverData.reactorStorage;

    let hasItem = storage[posKey] != undefined;

    if (!hasItem && !item.isEmpty()) {
        // Validamos si el ítem tiene alguno de los dos tags permitidos
        let validTag1 = item.hasTag('satsu_iron_man_addon:armors/main');
        let validTag2 = item.hasTag('satsu_iron_man_addon:armors/iron_man/hulkbusters/main');

        if (!validTag1 && !validTag2) {
            player.tell('¡Este ítem no es compatible con el reactor!');
            return;
        }

        // Guardamos las propiedades clave del ítem de forma manual y segura
        storage[posKey] = {
            id: item.id,
            count: 1,
            nbt: item.nbt ? item.nbt.copy() : null
        };
        item.count--;
        
        player.tell('¡Ítem colocado en el reactor!');

    } else if (hasItem && item.isEmpty()) {
        let savedData = storage[posKey];

        // Reconstruimos el ítem usando su ID y le devolvemos su NBT original intacto
        let recoveredItem = Item.of(savedData.id, savedData.count);
        if (savedData.nbt) {
            recoveredItem.nbt = savedData.nbt;
        }

        player.setHeldItem(hand, recoveredItem);
        delete storage[posKey];
        
        player.tell('¡Has retirado el ítem del reactor!');
    }
});

LevelEvents.tick(event => {
    let level = event.level;
    if (level.isClientSide()) return;
    if (level.getTime() % 20 != 0) return;

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
        
        // Si el ítem tiene NBT, incrementamos la energía dentro de él
        if (savedData && savedData.nbt) {
            try {
                let currentEnergy = savedData.nbt.contains('Energy') ? savedData.nbt.getDouble('Energy') : 0.0;
                let maxEnergy = 100000.0; // Ajusta tu máximo si lo requieres
                
                if (currentEnergy < maxEnergy) {
                    savedData.nbt.putDouble('Energy', currentEnergy + 10.0);
                }
            } catch(e) {
                // Previene cualquier interrupción en el tick
            }
        }
    }
});