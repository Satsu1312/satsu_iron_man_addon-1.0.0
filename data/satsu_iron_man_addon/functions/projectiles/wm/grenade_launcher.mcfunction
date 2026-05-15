playsound minecraft:entity.generic.explode neutral @p[distance=0..30] ~ ~ ~
particle minecraft:explosion ~ ~ ~ 0.1 0.1 0.1 1 1 normal
particle minecraft:explosion ~ ~ ~ 0.1 0.1 0.1 1 1 normal
particle minecraft:explosion ~ ~ ~ 0.1 0.1 0.1 1 1 normal
particle minecraft:explosion ~ ~ ~ 0.1 0.1 0.1 1 1 normal
particle minecraft:explosion ~ ~ ~ 0.1 0.1 0.1 1 1 normal
particle minecraft:explosion ~ ~ ~ 0.1 0.1 0.1 1 1 normal
particle minecraft:explosion ~ ~ ~ 0.1 0.1 0.1 1 1 normal
particle minecraft:explosion ~ ~ ~ 0.1 0.1 0.1 1 1 normal
particle minecraft:explosion ~ ~ ~ 0.1 0.1 0.1 1 1 normal
particle minecraft:explosion ~ ~ ~ 0.1 0.1 0.1 1 1 normal
particle minecraft:explosion ~ ~ ~ 0.1 0.1 0.1 1 1 normal
particle minecraft:explosion ~ ~ ~ 0.1 0.1 0.1 1 1 normal
particle minecraft:explosion ~ ~ ~ 0.1 0.1 0.1 1 1 normal
particle minecraft:explosion ~ ~ ~ 0.1 0.1 0.1 1 1 normal
particle minecraft:explosion ~ ~ ~ 0.1 0.1 0.1 1 1 normal
particle minecraft:explosion ~ ~ ~ 0.1 0.1 0.1 1 1 normal
particle minecraft:explosion ~ ~ ~ 0.1 0.1 0.1 1 1 normal
particle minecraft:explosion ~ ~ ~ 0.1 0.1 0.1 1 1 normal
particle minecraft:explosion ~ ~ ~ 0.1 0.1 0.1 1 1 normal
particle minecraft:explosion ~ ~ ~ 0.1 0.1 0.1 1 1 normal
particle minecraft:explosion ~ ~ ~ 0.1 0.1 0.1 1 1 normal
particle minecraft:explosion ~ ~ ~ 0.1 0.1 0.1 1 1 normal
particle minecraft:explosion ~ ~ ~ 0.1 0.1 0.1 1 1 normal
particle minecraft:explosion ~ ~ ~ 0.1 0.1 0.1 1 1 normal
particle minecraft:explosion ~ ~ ~ 0.1 0.1 0.1 1 1 normal
particle minecraft:lava ~0.1 ~ ~0.1 0 0 0 1 1
particle minecraft:campfire_cosy_smoke ^ ^0.01 ^0.01 0 0 0 0.15 1
particle minecraft:campfire_cosy_smoke ^ ^0.01 ^0.01 0 0 0 0.15 1
particle minecraft:campfire_cosy_smoke ^ ^0.01 ^0.01 0 0 0 0.15 1
execute as @e[tag=!maximum.pulse,sort=nearest,distance=0..5] at @s if entity @s[type=!#satsu_iron_man_addon:items] run damage @s 1 minecraft:player_attack