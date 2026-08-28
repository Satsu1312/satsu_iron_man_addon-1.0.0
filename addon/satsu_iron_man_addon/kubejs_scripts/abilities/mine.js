//Made by Codecreality
StartupEvents.registry("palladium:abilities", (event) => {
  var $Block = Java.loadClass('net.minecraft.world.level.block.Block');
  var $ExperienceOrb = Java.loadClass('net.minecraft.world.entity.ExperienceOrb');
  var SILK_TOOL = Item.of('minecraft:diamond_pickaxe').enchant('minecraft:silk_touch', 1);
  var FORTUNE_TOOL = Item.of('minecraft:diamond_pickaxe').enchant('minecraft:fortune', 3);
  var DEFAULT_TOOL = Item.of('minecraft:diamond_pickaxe');

  event
    .create("satsu_iron_man_addon:mine")
    .icon(palladium.createItemIcon("minecraft:stone"))
    .documentationDescription("destroy block ability")
    .addProperty("range", "float", 2, "range of ability")
    .addProperty(
      "excluded_tag",
      "string",
      "minecraft:air",
      "name of the excluded tag"
    )
    .addProperty(
      "blockset",
      "string",
      "minecraft:air",
      "name of the block to set"
    )
    .addProperty("destroy", "string", "destroy", "keep, destroy or replace")
    .tick((entity, entry, holder, enabled) => {
      if (enabled && entity.isPlayer()) {
        var propExcludedTag = entry.getPropertyByName("excluded_tag");
        var propBlockSet = entry.getPropertyByName("blockset");
        var propDestroyMode = entry.getPropertyByName("destroy");
        var propRange = entry.getPropertyByName("range");
        var worldLevel = entity.level;
        var rayResult = entity.rayTrace(propRange);
        
        if (rayResult !== null && rayResult.block !== null) {
          var targetBlock = rayResult.block;
          var blockState = targetBlock.blockState;
          var pos = targetBlock.pos;

          // Obtener el ID del bloque de forma segura en KubeJS
          var blockId = "";
          try {
            blockId = blockState.block.id.toString().toLowerCase();
          } catch (e) {
            try {
              blockId = targetBlock.id.toString().toLowerCase();
            } catch (err) {
              blockId = blockState.toString().toLowerCase();
            }
          }

          // Verificamos si cumple con la exclusión (soportando Tags con # y bloques planos)
          var isExcluded = false;
          try {
            if (propExcludedTag.startsWith("#")) {
              var tagName = propExcludedTag.substring(1);
              isExcluded = blockState.in(tagName);
            } else {
              isExcluded = blockState.is(propExcludedTag);
            }
          } catch (e) {
            isExcluded = (blockId === propExcludedTag.toLowerCase());
          }

          if (blockState.isAir() || isExcluded) return;

          // 1. LÓGICA DE CURIOS NBT PARA LEER SILK TOUCH / FORTUNE
          var activeMineMode = "none";
          try {
            var playerNbt = entity.nbt;
            if (playerNbt && playerNbt.ForgeCaps) {
              var curiosCap = playerNbt.ForgeCaps.get('curios:inventory');
              
              if (curiosCap && curiosCap.Curios) {
                curiosCap.Curios.forEach(slotGroup => {
                  if (slotGroup.Identifier === 'tecnology_armor') {
                    if (slotGroup.StacksHandler && slotGroup.StacksHandler.Stacks && slotGroup.StacksHandler.Stacks.Items) {
                      var itemsList = slotGroup.StacksHandler.Stacks.Items;
                      
                      itemsList.forEach(slotItem => {
                        if (slotItem) {
                          var tag = slotItem.tag || null;
                          if (tag) {
                            var mode = "";
                            var enabledMine = "";

                            try {
                              mode = tag.getString ? tag.getString("mine_mode") : (tag.mine_mode || "");
                            } catch (e) {}

                            try {
                              enabledMine = tag.getString ? tag.getString("enabled_mine") : (tag.enabled_mine || "");
                            } catch (e) {}

                            var isEnabled = (enabledMine === 'true' || enabledMine === true || enabledMine === '1' || enabledMine === 1);

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

          // 2. SELECCIONAR LA HERRAMIENTA ADECUADA
          var tool = DEFAULT_TOOL;
          if (activeMineMode === 'silk_touch') {
            tool = SILK_TOOL;
          } else if (activeMineMode === 'fortune') {
            tool = FORTUNE_TOOL;
          }

          // 3. OBTENER LAS GOTAS USANDO LA HERRAMIENTA DINÁMICA
          var drops = $Block.getDrops(
            blockState,
            worldLevel,
            pos,
            worldLevel.getBlockEntity(pos),
            entity,
            tool
          );

          if (drops && drops.length > 0) {
            drops.forEach(drop => {
              $Block.popResource(worldLevel, pos, Item.of(drop));
            });
          }

          // 4. GENERACIÓN DE EXPERIENCIA EXPANDIDA Y COBERTURA COMPLETA
          if (activeMineMode !== 'silk_touch') {
            var expAmount = 0;

            // Spawners / Generadores
            if (blockId.includes("spawner")) {
              expAmount = Utils.random.nextInt(16) + 15; // 15 a 30 XP
            }
            // Bloques de Sculk
            else if (blockId.includes("sculk_catalyst")) {
              expAmount = 20;
            } else if (blockId.includes("sculk_sensor") || blockId.includes("sculk_shrieker")) {
              expAmount = 5;
            } else if (blockId.includes("sculk")) {
              expAmount = 1;
            }
            // Diamante, Esmeralda y Gemas de Mods (Rubí, Zafiro, Topacio, etc.)
            else if (
              blockId.includes("diamond") || 
              blockId.includes("emerald") || 
              blockId.includes("ruby") || 
              blockId.includes("sapphire") || 
              blockId.includes("topaz") || 
              blockId.includes("alexandrite")
            ) {
              expAmount = Utils.random.nextInt(5) + 3; // 3 a 7 XP
            } 
            // Cuarzo del Nether y Cuarzo de Mods
            else if (blockId.includes("quartz")) {
              expAmount = Utils.random.nextInt(4) + 2; // 2 a 5 XP
            } 
            // Lapislázuli y Redstone
            else if (blockId.includes("lapis") || blockId.includes("redstone")) {
              expAmount = Utils.random.nextInt(5) + 1; // 1 a 5 XP
            } 
            // Carbón (Normal y Deepslate)
            else if (blockId.includes("coal")) {
              expAmount = Utils.random.nextInt(3); // 0 a 2 XP
            } 
            // Oro del Nether
            else if (blockId.includes("nether_gold")) {
              expAmount = Utils.random.nextInt(2); // 0 a 1 XP
            }
            // Racimo de Amatista
            else if (blockId.includes("amethyst_cluster")) {
              expAmount = Utils.random.nextInt(3) + 1; // 1 a 3 XP
            }
            // Minerales específicos de experiencia en mods (XP Ore, Experience Ore)
            else if (blockId.includes("experience") || blockId.includes("xp_ore")) {
              expAmount = Utils.random.nextInt(6) + 2; // 2 a 7 XP
            }
            // Fallback para cualquier otro mineral de mod que soltaría XP (excluyendo metales básicos)
            else if (
              blockId.includes("ore") && 
              !blockId.includes("iron") && 
              !blockId.includes("gold") && 
              !blockId.includes("copper") && 
              !blockId.includes("debris")
            ) {
              expAmount = Utils.random.nextInt(3) + 1; // 1 a 3 XP
            }

            if (expAmount > 0 && !worldLevel.isClientSide()) {
              var expOrb = new $ExperienceOrb(
                worldLevel, 
                pos.getX() + 0.5, 
                pos.getY() + 0.5, 
                pos.getZ() + 0.5, 
                expAmount
              );
              worldLevel.addFreshEntity(expOrb);
            }
          }

          // 5. APLICAR EL CAMBIO DE BLOQUE
          if (propBlockSet && propBlockSet !== "minecraft:air") {
            worldLevel.setBlockAndUpdate(pos, Block.id(propBlockSet).blockState);
          } else {
            worldLevel.setBlockAndUpdate(pos, Block.id("minecraft:air").blockState);
          }
        }
      }
    });
});