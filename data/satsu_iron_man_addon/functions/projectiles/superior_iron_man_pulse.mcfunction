playsound minecraft:entity.generic.explode neutral @p ~ ~ ~
particle minecraft:explosion_emitter ~ ~ ~
particle minecraft:lava ~0.1 ~ ~0.1 0 0 0 1 10
particle minecraft:campfire_cosy_smoke ^ ^0.01 ^0.01 0 0 0 0.15 40
execute as @e[tag=!maximum.pulse,sort=nearest,distance=0..5.3] at @s if entity @s[type=!#satsu_iron_man_addon:items] run damage @s 8 minecraft:player_attack