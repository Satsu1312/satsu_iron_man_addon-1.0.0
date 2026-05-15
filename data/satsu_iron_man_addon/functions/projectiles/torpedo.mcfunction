playsound minecraft:entity.generic.explode neutral @p[distance=0..30] ~ ~ ~
particle minecraft:bubble ~ ~ ~
particle minecraft:bubble ~0.1 ~ ~0.1 0 0 0 1 10
particle minecraft:bubble ^ ^0.01 ^0.01 0 0 0 0.15 40
execute as @e[tag=!maximum.pulse,sort=nearest,distance=0..5] at @s if entity @s[type=!#satsu_iron_man_addon:items] run damage @s 8 minecraft:player_attack