let satsuSpeedLastPos = null;

ClientEvents.tick(() => {
  // moved speed calculation to client
  const player = Client.player;

  if (!player) {
    satsuSpeedLastPos = null;
    global["speedBPS"] = "0.00";
    return;
  }

  const x = player.x;
  const z = player.z;

  if (satsuSpeedLastPos) {
    const dx = x - satsuSpeedLastPos.x;
    const dz = z - satsuSpeedLastPos.z;
    //stores kmh in global hud value instead of Client.player.persistentData speedBPS
    const kmh = Math.sqrt(dx * dx + dz * dz) * 20 * 3.6;
    global["speedBPS"] = kmh.toFixed(2);
  } else {
    global["speedBPS"] = "0.00";
  }

  satsuSpeedLastPos = { x: x, z: z };
});