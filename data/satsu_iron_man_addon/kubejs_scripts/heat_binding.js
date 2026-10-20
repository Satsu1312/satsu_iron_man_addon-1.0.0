PlayerEvents.tick(event => {
  const { player, server } = event;
  if (!player) return;

  // Ejecutar cada 10 ticks (0.5 segundos) para optimizar rendimiento
  if (server.tickCount % 10 !== 0) return;

  let rightHeat = 0.0;
  let leftHeat = 0.0;
  let foundArmor = false;

  try {
    let playerNbt = player.nbt;
    if (playerNbt && playerNbt.ForgeCaps) {
      let curiosCap = playerNbt.ForgeCaps.get('curios:inventory');
      
      if (curiosCap && curiosCap.Curios) {
        curiosCap.Curios.forEach(slotGroup => {
          if (slotGroup.Identifier === 'tecnology_armor') {
            if (slotGroup.StacksHandler && slotGroup.StacksHandler.Stacks && slotGroup.StacksHandler.Stacks.Items) {
              let itemsList = slotGroup.StacksHandler.Stacks.Items;
              
              itemsList.forEach((slotItem) => {
                if (slotItem) {
                  let tag = slotItem.tag || null;
                  if (tag) {
                    try {
                      let rawRight = tag.getFloat ? tag.getFloat("right_repulsor_heat") : (tag.right_repulsor_heat || 0.0);
                      let rawLeft = tag.getFloat ? tag.getFloat("left_repulsor_heat") : (tag.left_repulsor_heat || 0.0);
                      
                      rightHeat = parseFloat(rawRight);
                      leftHeat = parseFloat(rawLeft);
                      foundArmor = true;
                    } catch (e) {}
                  }
                }
              });
            }
          }
        });
      }
    }
  } catch (error) {}

  if (foundArmor) {
    palladium.setProperty(player, "satsu_iron_man_addon_heat_repulsor_right", rightHeat);
    palladium.setProperty(player, "satsu_iron_man_addon_heat_repulsor_left", leftHeat);
  }
});
PlayerEvents.tick(event => {
  const { player, server } = event;
  if (!player) return;

  // Ejecutar cada 10 ticks (0.5 segundos) para optimizar rendimiento
  if (server.tickCount % 10 !== 0) return;

  let heatValue = 0.0;
  let foundArmor = false;

  try {
    let playerNbt = player.nbt;
    if (playerNbt && playerNbt.ForgeCaps) {
      let curiosCap = playerNbt.ForgeCaps.get('curios:inventory');
      
      if (curiosCap && curiosCap.Curios) {
        curiosCap.Curios.forEach(slotGroup => {
          // Cambiado al slot de 'hands'
          if (slotGroup.Identifier === 'hands') {
            if (slotGroup.StacksHandler && slotGroup.StacksHandler.Stacks && slotGroup.StacksHandler.Stacks.Items) {
              let itemsList = slotGroup.StacksHandler.Stacks.Items;
              
              itemsList.forEach((slotItem) => {
                if (slotItem) {
                  let tag = slotItem.tag || null;
                  if (tag) {
                    try {
                      // Obtiene el calor (puedes ajustar el nombre NBT de la etiqueta del item si usa uno diferente)
                      let rawHeat = tag.getFloat ? tag.getFloat("repulsor_heat") : (tag.repulsor_heat || 0.0);
                      
                      heatValue = parseFloat(rawHeat);
                      foundArmor = true;
                    } catch (e) {}
                  }
                }
              });
            }
          }
        });
      }
    }
  } catch (error) {}

  if (foundArmor) {
    // Cambiado a la nueva propiedad de Palladium
    palladium.setProperty(player, "satsu_iron_man_addon_heat_repulsor_watch", heatValue);
  }
});