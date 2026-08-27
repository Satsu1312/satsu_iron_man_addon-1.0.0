(function() {
  const $Block = Java.loadClass('net.minecraft.world.level.block.Block');
  const SILK_TOOL = Item.of('minecraft:diamond_pickaxe').enchant('minecraft:silk_touch', 1);
  const FORTUNE_TOOL = Item.of('minecraft:diamond_pickaxe').enchant('minecraft:fortune', 3);
  const AIR_STATE = Block.id('minecraft:air').blockState;

  BlockEvents.broken(event => {
    const { block, level, player } = event;

    if (!player || player.creative) return;

    let activeMineMode = "none";
    
    try {
      let playerNbt = player.nbt;
      if (playerNbt && playerNbt.ForgeCaps) {
        let curiosCap = playerNbt.ForgeCaps.get('curios:inventory');
        
        if (curiosCap && curiosCap.Curios) {
          curiosCap.Curios.forEach(slotGroup => {
            if (slotGroup.Identifier === 'tecnology_armor') {
              if (slotGroup.StacksHandler && slotGroup.StacksHandler.Stacks && slotGroup.StacksHandler.Stacks.Items) {
                let itemsList = slotGroup.StacksHandler.Stacks.Items;
                
                itemsList.forEach((slotItem, index) => {
                  if (slotItem) {
                    let tag = slotItem.tag || null;

                    if (tag) {
                      let mode = "";
                      let enabled = "";

                      try {
                        mode = tag.getString ? tag.getString("mine_mode") : (tag.mine_mode || "");
                      } catch (e) {}

                      try {
                        enabled = tag.getString ? tag.getString("enabled_mine") : (tag.enabled_mine || "");
                      } catch (e) {}

                      let isEnabled = (enabled === 'true' || enabled === true || enabled === '1' || enabled === 1);

                      if (isEnabled) {
                        if (mode === 'silk_touch') {
                          activeMineMode = "silk_touch";
                        } else if (mode === 'fortune') {
                          activeMineMode = "fortune";
                        }
                      }
                    }
                  }
                });
              }
            }
          });
        }
      }
    } catch (error) {}

    if (activeMineMode === "none") return;

    let activeTool = (activeMineMode === 'silk_touch') ? SILK_TOOL : FORTUNE_TOOL;

    try {
      let drops = $Block.getDrops(
        block.blockState,
        level,
        block.pos,
        null,
        player,
        activeTool
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