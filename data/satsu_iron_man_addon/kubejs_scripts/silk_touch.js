const $Block = Java.loadClass('net.minecraft.world.level.block.Block');

BlockEvents.broken(event => {
  const { block, level, player } = event;

  if (!player || player.creative) return;

  let hasAbilityEntry = false;
  let isAbilityEnabled = false;

  // 1. Verificación de la habilidad en Palladium
  try {
    palladium.abilities.getEntries(player).forEach((entry) => {
      const abilityId = entry.getConfiguration()?.ability?.id;
      
      if (abilityId === "satsu_iron_man_addon:silk_touch_ability") {
        hasAbilityEntry = true;
        
        const isEnabled = entry.getPropertyByName("enabled");
        if (isEnabled === true || isEnabled === "true") {
          isAbilityEnabled = true;
        }
      }
    });
  } catch (error) {
    // Evita crasheos de lectura
  }

  // Si no cumple las condiciones, salimos limpiamente sin tocar nada
  if (!hasAbilityEntry || !isAbilityEnabled) return;

  // 2. Lógica de Toque de Seda
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

    if (drops && drops.length > 0) {
      drops.forEach(drop => {
        block.popItem(Item.of(drop));
      });
      
      level.setBlockAndUpdate(block.pos, Block.id('minecraft:air').blockState);
      
      // En KubeJS 6, usamos event.success() o evitamos conflictos de salida al cancelar
      event.cancel();
    }
  } catch (error) {
    console.error("[Iron Man Addon] Error en Silk Touch KubeJS: " + error);
  }
});