// Made by WolfDude24
global.ticksFromLastHit = (entity) => {
    if (!entity.persistentData?.lastHitTime) return Infinity;

    let lastHitTime = entity.persistentData.lastHitTime;
    let now = Math.floor(Date.now());
    let difference = (now - lastHitTime) / 50;

    return difference;
};

StartupEvents.registry('palladium:condition_serializer', event => {
    event.create('satsu_iron_man_addon:hit_condition')
        .addProperty("mode", "string", "both", "Mode: 'block' (block hits), 'entity' (entity hits), or 'both' (block or entity hits)")
        .test((entity, properties) => {
            if (!entity || !entity.player) return false;

            const mode = properties.get("mode");
            const lastHitType = entity.persistentData.lastHitType;

            const isRecent = global.ticksFromLastHit(entity) < 1;

            if (!isRecent) return false;

            if (mode === 'entity') {
                return lastHitType === 'entity';
            } else if (mode === 'block') {
                return lastHitType === 'block';
            } else if (mode === 'both') {
                return lastHitType === 'entity' || lastHitType === 'block';
            }

            return false;
        });
});