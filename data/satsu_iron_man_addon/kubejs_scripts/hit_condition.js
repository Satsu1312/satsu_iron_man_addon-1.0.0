// Made by WolfDude24
EntityEvents.hurt((event) => {
    let { entity, source: { immediate } } = event;
    if (!immediate || !immediate.isPlayer()) return;

    immediate.persistentData.lastHitType = 'entity';
    immediate.persistentData.lastHitTime = Math.floor(Date.now());
    immediate.persistentData.lastAttacked = entity.getStringUuid();
});

BlockEvents.leftClicked(event => {
    const player = event.player;
    if (player) {
        player.persistentData.lastHitType = 'block';
        player.persistentData.lastHitTime = Math.floor(Date.now());
    }
});