playsound minecraft:entity.generic.explode neutral @p[distance=0..30] ~ ~ ~
particle satsu_iron_man_addon:electrify_effect ~ ~ ~ 0.1 0.1 0.1 1 1 normal
execute as @e[tag=!maximum.pulse,sort=nearest,distance=0..6.5] at @s if entity @s[type=!#satsu_iron_man_addon:items] run damage @s 2 minecraft:player_attack
execute as @e[tag=!maximum.pulse,sort=nearest,distance=0.1..6.5] at @s if entity @s[type=!#satsu_iron_man_addon:items] run superpower add satsu_iron_man_addon:paralized @s
execute as @e[tag=!maximum.pulse,sort=nearest,distance=0.1..6.5] at @s if entity @s[type=!#satsu_iron_man_addon:items] run effect give @s minecraft:slowness 4 255 true