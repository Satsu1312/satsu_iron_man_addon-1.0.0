playsound minecraft:entity.generic.explode neutral @p ~ ~ ~
particle minecraft:explosion_emitter ~ ~ ~
particle minecraft:lava ~0.1 ~ ~0.1 0 0 0 1 3
particle minecraft:campfire_cosy_smoke ^ ^0.01 ^0.01 0 0 0 0.15 10
execute as @e[tag=!maximum.pulse,sort=nearest,distance=0..4.5] at @s if entity @s[type=!#satsu_iron_man_addon:items] run damage @s 5 minecraft:player_attack