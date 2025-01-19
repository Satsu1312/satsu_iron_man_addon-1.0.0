StartupEvents.registry('palladium:abilities', (event) => {
        event.create('satsu_iron_man_addon:projectile_script')
            .icon(palladium.createItemIcon('palladium:vibranium_circuit'))
			.addProperty('entity_type', 'string', "minecraft:snowball", 'Entity type ID for the projectile entity')
			.addProperty('entity_data', 'compound_tag', null, 'Entity NBT data')
			.addProperty('inaccuracy', 'float', 0, 'Determines the inaccuracy when shooting the projectile')
			.addProperty('velocity', 'float', 1.5, 'Determines the velocity when shooting the projectile')
			.addProperty('swinging_arm', 'string', "main_arm", 'Determines which arm(s) should swing upon shooting. Possible values: [none, main_arm, off_arm, right_arm, left_arm, both]')
			
			.addProperty('x_offset', 'float', 0, 'Offset for the x axis')
			.addProperty('z_offset', 'float', 0, 'Offset for the z axis')
					
            .tick((entity, entry, holder, enabled) => {
                if (enabled) {
					const x_offset = entry.getPropertyByName('x_offset');
					const z_offset = entry.getPropertyByName('z_offset');
					const entity_type = entry.getPropertyByName('entity_type');
					const entity_data = entry.getPropertyByName('entity_data');
					const inaccuracy = entry.getPropertyByName('inaccuracy');
					const velocity = entry.getPropertyByName('velocity');
					const swinging_arm = entry.getPropertyByName('swinging_arm');
					
					let Projectile = entity.block.createEntity(entity_type)
					Projectile.x = entity.x + x_offset
					Projectile.y = entity.getEyeY()
					Projectile.z = entity.z + z_offset
					if (entity_data != null) {
					Projectile.mergeNbt(entity_data)
					}
					Projectile.shootFromRotation(entity, entity.pitch, entity.yaw, 0, velocity, inaccuracy);
												// entity, pitch,   yaw,   idk,  velocity , inaccuracy 
					Projectile.setOwner(entity)				
					Projectile.spawn() 
                   
			}
            });
    });
	



