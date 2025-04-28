playsound minecraft:entity.generic.explode neutral @p ~ ~ ~
particle minecraft:explosion_emitter ~ ~ ~
execute as @e[tag=!maximum.pulse,sort=nearest,distance=0..5.2] run damage @s 10 minecraft:player_attack