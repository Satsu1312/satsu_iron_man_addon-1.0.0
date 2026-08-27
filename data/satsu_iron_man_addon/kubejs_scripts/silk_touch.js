const $Block = Java.loadClass('net.minecraft.world.level.block.Block');

BlockEvents.broken(event => {
  const { block, level, player } = event;

  if (!player || player.creative) return;

  // 1. Verificación de Palladium BLINDADA contra errores (Tu lógica intacta)
  let hasSilkAbility = false;
  try {
    palladium.abilities.getEntries(player).forEach((entry) => {
      const abilityId = entry.getConfiguration()?.ability?.id;
      if (abilityId === "satsu_iron_man_addon:silk_touch_ability") {
        const isEnabled = entry.getPropertyByName("enabled");
        if (isEnabled !== false) {
          hasSilkAbility = true;
        }
      }
    });
  } catch (error) {
    // Si hay un error de carga, lo ignoramos para NO romper la minería vanilla
  }

  // Si no tienes la habilidad, el script se detiene aquí y Minecraft actúa 100% normal.
  if (!hasSilkAbility) return;

  // 2. Lógica de Toque de Seda (Usando la mecánica exacta del script de @strnge05)
  try {
    // Simulamos un pico de diamante con Toque de Seda
    let silkTool = Item.of('minecraft:diamond_pickaxe').enchant('minecraft:silk_touch', 1);

    // Consultamos la Loot Table nativa de Minecraft usando los parámetros directos
    let drops = $Block.getDrops(
      block.blockState,
      level,
      block.pos,
      null,
      player,
      silkTool
    );

    // Si el Toque de Seda devuelve ítems válidos (ej. un bloque de cristal entero, menas, etc.)
    if (drops && drops.length > 0) {
      
      // Soltamos cada ítem generado por el toque de seda
      drops.forEach(drop => {
        block.popItem(Item.of(drop));
      });
      
      // Actualizamos el bloque a aire usando la sintaxis de @strnge05 (esto evita el lag/desincronización)
      level.setBlockAndUpdate(block.pos, Block.id('minecraft:air').blockState);
      
      // Cancelamos el evento vanilla para que no suelte el carbón/diamante suelto
      event.cancel();
    }
  } catch (error) {
    console.error("[Iron Man Addon] Error en Silk Touch KubeJS: " + error);
  }
});