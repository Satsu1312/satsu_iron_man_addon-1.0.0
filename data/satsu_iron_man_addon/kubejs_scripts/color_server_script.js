const ALLOWED_MAP = {
  "satsu_iron_man_addon.PrimaryColour": "main_color",
  "satsu_iron_man_addon.SecondaryColour": "secondary_color",
  "satsu_iron_man_addon.TertiaryColour": "thirty_color",
  "satsu_iron_man_addon_beam_core_color": "beam_core_color",
  "satsu_iron_man_addon_beam_glow_color": "beam_glow_color"
};

NetworkEvents.dataReceived('satsu_apply_color', event => {
  const player = event.player;
  const data = event.data;
  
  if (!player || !data) return;

  const prop = data.property;
  const rawVal = data.value;

  // Verificamos si la propiedad está en nuestro mapa de conversión
  const nbtKey = ALLOWED_MAP[prop];
  if (!nbtKey) return;

  if (rawVal === undefined || rawVal === null) return;

  // Procesamiento del color (asegurar que sea un número válido de 24 bits)
  let value = Number(rawVal);
  if (Number.isNaN(value)) return;
  value = Math.floor(value) & 0xFFFFFF;

  // Accedemos a la pechera del jugador
  const chestItem = player.getChestArmorItem();

  if (!chestItem.isEmpty()) {
    // Obtenemos o creamos el tag NBT
    let nbt = chestItem.getOrCreateTag();
    
    // Guardamos el color con la nueva clave (ej. "main_color")
    nbt.putInt(nbtKey, value);
    
    // Sincronizamos los cambios para que se apliquen correctamente
    chestItem.setTag(nbt);
  }
});

NetworkEvents.dataReceived("satsu_reset_color", event => {
  const { player, data } = event;
  if (!player || !data) return;
  const nbtKey = ALLOWED_MAP[data.property];
  if (!nbtKey) return;

  const chestItem = player.getChestArmorItem();

  if (!chestItem.isEmpty()) {
    let nbt = chestItem.getOrCreateTag();
    if (nbt.contains(nbtKey)) {
      nbt.remove(nbtKey);
      player.inventoryMenu.broadcastChanges();
    }
  }
});