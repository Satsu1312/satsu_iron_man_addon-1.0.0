(function() {
  const $Block = Java.loadClass('net.minecraft.world.level.block.Block');

  BlockEvents.broken(event => {
    const { block, level, player } = event;

    if (!player || player.creative) return;

    let isSilkActive = false;
    try {
      var satsuPropVal = palladium.getProperty(player, "satsu_iron_man_addon_silk_touch_active");
      console.log("[Iron Man Addon] [DEBUG] propVal: " + satsuPropVal + " (tipo: " + typeof satsuPropVal + ")");
      
      if (satsuPropVal === true || String(satsuPropVal).toLowerCase() === "true" || satsuPropVal === 1 || satsuPropVal === "1") {
        isSilkActive = true;
      }
    } catch (error) {
      console.log("[Iron Man Addon] [DEBUG] Error leyendo propiedad: " + error);
    }

    console.log("[Iron Man Addon] [DEBUG] isSilkActive final: " + isSilkActive);
    if (!isSilkActive) return;

    try {
      let silkTool = Item.of('minecraft:diamond_pickaxe').enchant('minecraft:silk_touch', 1);

      let drops = $Block.getDrops(
        block.blockState,
        level,
        block.pos,
        null,
        player,
        silkTool
      );

      console.log("[Iron Man Addon] [DEBUG] Drops encontrados: " + (drops ? drops.length : "null/undefined"));

      if (drops && drops.length > 0) {
        drops.forEach(drop => {
          block.popItem(Item.of(drop));
        });
        
        level.setBlockAndUpdate(block.pos, Block.id('minecraft:air').blockState);
        event.cancel();
      }
    } catch (error) {
      console.error("[Iron Man Addon] Error en Silk Touch KubeJS: " + error);
    }
  });
})();