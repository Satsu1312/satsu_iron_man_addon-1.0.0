playsound minecraft:entity.generic.explode neutral @p ~ ~ ~
particle minecraft:explosion_emitter ~ ~ ~
execute as @e[tag=!maximum.pulse,sort=nearest,distance=0..6.5] at @s if entity @s[type=!#satsu_iron_man_addon:items] run damage @s 23 minecraft:player_attack