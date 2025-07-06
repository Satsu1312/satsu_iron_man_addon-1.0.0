playsound minecraft:entity.generic.explode neutral @p ~ ~ ~
particle minecraft:bubble ~ ~ ~
particle minecraft:bubble ~0.1 ~ ~0.1 0 0 0 1 10
particle minecraft:bubble ^ ^0.01 ^0.01 0 0 0 0.15 40
execute as @e[tag=!maximum.pulse,sort=nearest,distance=0..5] run damage @s 8 minecraft:player_attack