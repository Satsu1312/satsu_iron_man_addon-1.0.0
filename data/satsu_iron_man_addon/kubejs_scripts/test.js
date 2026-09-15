// ==========================================
// 4. SOLTAR EL ÍTEM AL ROMPER EL BLOQUE
// ==========================================
BlockEvents.broken('satsu_iron_man_addon:reactor_ark_recharge_on', event => {
    let { block, level } = event;
    if (level.isClientSide()) return;

    let posKey = `${block.x},${block.y},${block.z},${level.dimension}`;
    let serverData = Utils.server.persistentData;
    let storage = serverData.reactorStorage;

    if (!storage || !storage[posKey]) return;

    let savedData = storage[posKey];

    // Reconstruimos el ítem exacto con su ID, cantidad y todos sus NBTs
    let droppedItem = Item.of(savedData.id, savedData.count);
    if (savedData.nbt) {
        droppedItem.nbt = savedData.nbt;
    }

    // Soltamos el ítem en el centro del bloque destruido
    let itemEntity = level.createEntity('item');
    itemEntity.x = block.x + 0.5;
    itemEntity.y = block.y + 0.5;
    itemEntity.z = block.z + 0.5;
    itemEntity.item = droppedItem;
    itemEntity.spawn();

    // Borramos el registro del almacenamiento
    delete storage[posKey];
});