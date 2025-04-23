playsound minecraft:entity.generic.explode neutral @p ~ ~ ~
particle minecraft:explosion_emitter ~ ~ ~
particle minecraft:lava ~0.1 ~ ~0.1 0 0 0 1 10
particle minecraft:campfire_cosy_smoke ^ ^0.01 ^0.01 0 0 0 0.15 40
execute as @e[sort=nearest,distance=0..5] unless score @s grave.ID = @e[type=palladium:custom_projectile,limit=1,sort=nearest] grave.ID run damage @s 5 minecraft:player_attack
execute as @e[sort=nearest,distance=0..5] unless score @s grave.ID = @e[type=palladium:custom_projectile,limit=1,sort=nearest] grave.ID run effect give @s minecraft:slowness 10 2