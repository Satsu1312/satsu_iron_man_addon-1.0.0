(function() {
  const $Block = Java.loadClass('net.minecraft.world.level.block.Block');
  const SILK_TOOL = Item.of('minecraft:diamond_pickaxe').enchant('minecraft:silk_touch', 1);
  const AIR_STATE = Block.id('minecraft:air').blockState;

  BlockEvents.broken(event => {
    const { block, level, player } = event;

    if (!player || player.creative) return;

    let hasValidCuriosItem = false;
    try {
      let playerNbt = player.nbt;
      if (playerNbt && playerNbt.ForgeCaps) {
        let curiosCap = playerNbt.ForgeCaps.get('curios:inventory');
        
        if (curiosCap && curiosCap.Curios) {
          curiosCap.Curios.forEach(slotGroup => {
            if (slotGroup.Identifier === 'tecnology_armor') {
              console.info("[Satsu Debug] Encontrado tecnology_armor, navegando StacksHandler.Stacks.Items");
              
              if (slotGroup.StacksHandler && slotGroup.StacksHandler.Stacks && slotGroup.StacksHandler.Stacks.Items) {
                let itemsList = slotGroup.StacksHandler.Stacks.Items;
                
                itemsList.forEach((slotItem, index) => {
                  console.info("[Satsu Debug] Revisando item en índice " + index + ": " + slotItem);
                  
                  if (slotItem) {
                    let tag = slotItem.tag || null;
                    
                    if (slotItem.id) {
                      console.info("[Satsu Debug] ID del item: " + slotItem.id);
                    }

                    if (tag) {
                      let mode = "";
                      let enabled = "";

                      try {
                        mode = tag.getString ? tag.getString("mine_mode") : (tag.mine_mode || "");
                      } catch (e) {
                        console.info("[Satsu Debug] Error leyendo mine_mode: " + e);
                      }

                      try {
                        enabled = tag.getString ? tag.getString("enabled_mine") : (tag.enabled_mine || "");
                      } catch (e) {
                        console.info("[Satsu Debug] Error leyendo enabled_mine: " + e);
                      }

                      console.info("[Satsu Debug] Valores leídos -> mine_mode: '" + mode + "' | enabled_mine: '" + enabled + "'");

                      let isModeSilk = (mode === 'silk_touch');
                      let isEnabled = (enabled === 'true' || enabled === true || enabled === '1' || enabled === 1);

                      if (isModeSilk && isEnabled) {
                        hasValidCuriosItem = true;
                        console.info("[Satsu Debug] ¡ÉXITO! Las condiciones coinciden perfectamente.");
                      } else {
                        console.info("[Satsu Debug] No coincide. isModeSilk: " + isModeSilk + ", isEnabled: " + isEnabled);
                      }
                    } else {
                      console.info("[Satsu Debug] El item no tiene tag.");
                    }
                  }
                });
              } else {
                console.info("[Satsu Debug] La ruta StacksHandler.Stacks.Items no está disponible.");
              }
            }
          });
        }
      }
    } catch (error) {
      console.info("[Satsu Debug] Error crítico general en Try/Catch: " + error);
    }

    console.info("[Satsu Debug] Estado final de hasValidCuriosItem: " + hasValidCuriosItem);
    if (!hasValidCuriosItem) return;

    try {
      let drops = $Block.getDrops(
        block.blockState,
        level,
        block.pos,
        null,
        player,
        SILK_TOOL
      );

      if (drops && drops.length > 0) {
        for (let i = 0; i < drops.length; i++) {
          block.popItem(Item.of(drops[i]));
        }
        
        level.setBlockAndUpdate(block.pos, AIR_STATE);
        event.cancel();
      }
    } catch (error) {}
  });
})();