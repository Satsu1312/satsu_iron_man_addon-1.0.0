EntityEvents.hurt(event => {
    const { entity, level, server } = event;

    if (!entity.isPlayer()) return;
    
entity.persistentData.lastDamageAmount = event.damage;
entity.persistentData.wasHit = true;
entity.persistentData.hitTime = Math.floor(Date.now());


});

PlayerEvents.tick(event => {
    const player = event.player;
    if (!player) return;

    if (!player.persistentData.wasHit) {
        player.persistentData.lastDamageAmount = 0;
        player.persistentData.hitTime = 0;
    }

    player.persistentData.wasHit = false;
});