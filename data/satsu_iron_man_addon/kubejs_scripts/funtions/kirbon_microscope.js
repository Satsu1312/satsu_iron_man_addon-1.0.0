// Función auxiliar para sincronizar el inventario del jugador
function syncPlayerInventory(player) {
    if (player.containerMenu) player.containerMenu.sendAllDataToRemote();
    if (player.inventory && typeof player.inventory.sendChanges === 'function') {
        player.inventory.sendChanges();
    }
}

// 1. Interacción para colocar o retirar exclusivamente el kirbon_extractor
BlockEvents.rightClicked('satsu_iron_man_addon:kirbon_microscope', event => {
    let { block, player, hand, item, level } = event;

    if (hand !== 'MAIN_HAND') return;

    let posKey = `${block.x},${block.y},${block.z},${level.dimension}`;
    let storage = Utils.server.persistentData.kirbonStorage || {};
    Utils.server.persistentData.kirbonStorage = storage;

    let hasItem = storage[posKey] !== undefined;

    if (!hasItem && !item.isEmpty()) {
        if (item.id !== 'satsu_iron_man_addon:kirbon_extractor') {
            return;
        }

        // Guardamos las coordenadas explícitamente dentro del objeto para evitar cruces
        storage[posKey] = {
            id: item.id,
            count: 1,
            x: block.x,
            y: block.y,
            z: block.z,
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

// 2. Tick del nivel: Se ejecuta cada segundo real (cada 20 ticks del juego)
LevelEvents.tick(event => {
    let level = event.level;
    if (level.isClientSide()) return;

    if (level.getTime() % 20 !== 0) return;

    let storage = Utils.server.persistentData.kirbonStorage;
    if (!storage) return;

    let currentDim = level.dimension.toString();

    // Hacemos una copia de las keys para evitar modificaciones concurrentes en el mapa mientras iteramos
    let keys = Object.keys(storage);

    for (let i = 0; i < keys.length; i++) {
        let posKey = keys[i];
        let parts = posKey.split(',');
        if (parts[3] !== currentDim) continue;

        let savedData = storage[posKey];
        if (!savedData) continue;

        // Usamos las coordenadas guardadas de manera individual para este bloque exacto
        let x = savedData.x !== undefined ? savedData.x : parseInt(parts[0], 10);
        let y = savedData.y !== undefined ? savedData.y : parseInt(parts[1], 10);
        let z = savedData.z !== undefined ? savedData.z : parseInt(parts[2], 10);

        let block = level.getBlock(x, y, z);
        if (block.id !== 'satsu_iron_man_addon:kirbon_microscope') {
            delete storage[posKey];
            continue;
        }

        if (savedData.id === 'satsu_iron_man_addon:kirbon_extractor') {
            if (!savedData.nbt) {
                savedData.nbt = {};
            }

            try {
                let currentKirbon = (savedData.nbt.contains && savedData.nbt.contains('kirbon')) ? savedData.nbt.getDouble('kirbon') : 0.0;
                let chargeRate = (savedData.nbt.contains && savedData.nbt.contains('Energy_Charge')) ? savedData.nbt.getDouble('Energy_Charge') : 1.0;
                
                currentKirbon += chargeRate;

                // Cuando llega o supera la meta
                if (currentKirbon >= 6000.0) {
                    currentKirbon = 0.0;

                    let rewardItem = Item.of('satsu_iron_man_addon:kirbon_particle', 1);
                    let itemEntity = level.createEntity('item');
                    itemEntity.setItem(rewardItem);
                    
                    // Spawnea estrictamente en las coordenadas de este microscopio específico
                    itemEntity.setPos(x + 0.5, y + 1.0, z + 0.5);
                    itemEntity.spawn();

                    level.playSound(null, x + 0.5, y + 0.5, z + 0.5, 'entity.experience_orb.pickup', 'blocks', 1.0, 1.2);
                }

                // Guardar de forma robusta en el NBT
                if (typeof savedData.nbt.putDouble === 'function') {
                    savedData.nbt.putDouble('kirbon', currentKirbon);
                } else {
                    savedData.nbt.kirbon = currentKirbon;
                }

                // Actualizamos de forma independiente en el almacenamiento
                storage[posKey] = savedData;

            } catch (e) {}
        }
    }
});

// 3. Devolver el extractor guardado si rompen el bloque
BlockEvents.broken('satsu_iron_man_addon:kirbon_microscope', event => {
    let { block, level } = event;
    if (level.isClientSide()) return;

    let posKey = `${block.x},${block.y},${block.z},${level.dimension}`;
    let storage = Utils.server.persistentData.kirbonStorage;

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