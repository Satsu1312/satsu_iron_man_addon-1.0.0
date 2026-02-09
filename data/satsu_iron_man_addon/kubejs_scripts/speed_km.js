const lastPos = {};

PlayerEvents.tick((event) => {
  let entity = event.entity;
  let id = entity.uuid;

  let x = entity.x;
  let z = entity.z;

  if (!lastPos[id]) {
    lastPos[id] = { x: x, z: z };
    return;
  }

  let dx = x - lastPos[id].x;
  let dz = z - lastPos[id].z;

  let speedPerTick = Math.sqrt(dx * dx + dz * dz);
  let speedBPS = speedPerTick * 20;
  Client.player.persistentData['speedBPS'] = speedBPS.toFixed(2);

  event.server.scheduleInTicks(1, () => {
    lastPos[id].x = x;
    lastPos[id].z = z;
  });
});
