const ALLOWED_MAP = {
  "satsu_iron_man_addon.PrimaryColour": "main_color",
  "satsu_iron_man_addon.SecondaryColour": "secondary_color",
  "satsu_iron_man_addon.TertiaryColour": "thirty_color",
  "satsu_iron_man_addon_beam_core_color": "beam_core_color",
  "satsu_iron_man_addon_beam_glow_color": "beam_glow_color"
};

const CURIOS_SLOT = "tecnology_armor"; 

NetworkEvents.dataReceived('satsu_apply_color', event => {
  const player = event.player;
  const data = event.data;
  
  if (!player || !data) return;

  const prop = data.property;
  const nbtKey = ALLOWED_MAP[prop];
  if (!nbtKey) return;

  let value = Number(data.value);
  if (Number.isNaN(value)) return;
  value = Math.floor(value) & 0xFFFFFF;

  const CuriosApi = Java.loadClass('top.theillusivec4.curios.api.CuriosApi');
  
  // ¡AQUÍ ESTABA EL ERROR! Cambiado a getCuriosHandler
  CuriosApi.getCuriosHelper().getCuriosHandler(player).ifPresent(handler => {
    let stacksHandler = handler.getStacksHandler(CURIOS_SLOT);
    
    if (stacksHandler.isPresent()) {
      let curioStacks = stacksHandler.get().getStacks();
      // Envolvemos el ítem para modificar el NBT con las herramientas de KubeJS
      let kjsItem = Item.of(curioStacks.getStackInSlot(0));

      if (!kjsItem.isEmpty()) {
        kjsItem.nbt.putInt(nbtKey, value);
        
        // Volvemos a inyectar el ítem actualizado (usando el ítem nativo)
        curioStacks.setStackInSlot(0, kjsItem.getMinecraftItemStack());
        player.inventoryMenu.broadcastChanges();
      }
    }
  });
});

NetworkEvents.dataReceived("satsu_reset_color", event => {
  const { player, data } = event;
  if (!player || !data) return;
  
  const nbtKey = ALLOWED_MAP[data.property];
  if (!nbtKey) return;

  const CuriosApi = Java.loadClass('top.theillusivec4.curios.api.CuriosApi');
  
  // Cambiado a getCuriosHandler
  CuriosApi.getCuriosHelper().getCuriosHandler(player).ifPresent(handler => {
    let stacksHandler = handler.getStacksHandler(CURIOS_SLOT);
    
    if (stacksHandler.isPresent()) {
      let curioStacks = stacksHandler.get().getStacks();
      let kjsItem = Item.of(curioStacks.getStackInSlot(0));

      if (!kjsItem.isEmpty()) {
        if (kjsItem.nbt.contains(nbtKey)) {
          kjsItem.nbt.remove(nbtKey);
          curioStacks.setStackInSlot(0, kjsItem.getMinecraftItemStack());
          player.inventoryMenu.broadcastChanges();
        }
      }
    }
  });
});