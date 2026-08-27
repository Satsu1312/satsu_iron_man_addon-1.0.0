(function() {
  const $Block = Java.loadClass('net.minecraft.world.level.block.Block');
  const SILK_TOOL = Item.of('minecraft:diamond_pickaxe').enchant('minecraft:silk_touch', 1);
  const AIR_STATE = Block.id('minecraft:air').blockState;

  BlockEvents.broken(event => {
    const { block, level, player } = event;

    if (!player || player.creative) return;

    let isSilkActive = false;
    try {
      var satsuPropVal = palladium.getProperty(player, "satsu_iron_man_addon_silk_touch");
      isSilkActive = (satsuPropVal === true || satsuPropVal === 1 || satsuPropVal === "true" || satsuPropVal === "1");
    } catch (error) {}

    if (!isSilkActive) return;

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