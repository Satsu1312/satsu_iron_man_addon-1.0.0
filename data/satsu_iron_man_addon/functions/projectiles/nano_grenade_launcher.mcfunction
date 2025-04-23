playsound minecraft:entity.generic.explode neutral @p ~ ~ ~
particle minecraft:explosion_emitter ~ ~ ~
execute as @e[sort=nearest,distance=0..8] unless score @s grave.ID = @e[type=palladium:custom_projectile,limit=1,sort=nearest] grave.ID run damage @s 23 minecraft:player_attack