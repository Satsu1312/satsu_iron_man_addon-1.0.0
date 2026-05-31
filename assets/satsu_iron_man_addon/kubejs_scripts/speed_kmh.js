let satsuSpeedLastPos = null;

// Changed: client-side speed tracker, replacing the old server-side speed script.
ClientEvents.tick(() => {
  const player = Client.player;

  if (!player) {
    satsuSpeedLastPos = null;
    global["satsu_iron_man_addon.speed_kmh"] = "0.00";
    return;
  }

  const x = player.x;
  const y = player.y;
  const z = player.z;

  if (satsuSpeedLastPos) {
    const dx = x - satsuSpeedLastPos.x;
    const dy = y - satsuSpeedLastPos.y;
    const dz = z - satsuSpeedLastPos.z;
    // Changed: convert blocks-per-tick movement into km/h for the HUD.
    const kmh = Math.sqrt(dx * dx + dy * dy + dz * dz) * 20 * 3.6;
    global["satsu_iron_man_addon.speed_kmh"] = kmh.toFixed(2);
  } else {
    global["satsu_iron_man_addon.speed_kmh"] = "0.00";
  }

  satsuSpeedLastPos = { x: x, y: y, z: z };
});
