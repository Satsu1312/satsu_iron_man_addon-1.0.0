playsound minecraft:entity.generic.explode neutral @p ~ ~ ~
particle minecraft:explosion ~ ~ ~ 0.1 0.1 0.1 1 1 normal
particle minecraft:campfire_cosy_smoke ^ ^0.01 ^0.01 0 0 0 0.15 2
execute as @e[tag=!maximum.pulse,sort=nearest,distance=0..6.5] at @s if entity @s[type=!#satsu_iron_man_addon:items] run damage @s 12 minecraft:player_attack
execute as @e[tag=!maximum.pulse,sort=nearest,distance=0.1..10] at @s if entity @s[type=!#satsu_iron_man_addon:items] run superpower add satsu_iron_man_addon:blind @s
execute as @e[tag=!maximum.pulse,sort=nearest,distance=0.1..10] at @s if entity @s[type=!#satsu_iron_man_addon:items] run effect give @s minecraft:slowness 30 255 true