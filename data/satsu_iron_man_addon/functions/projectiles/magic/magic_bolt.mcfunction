playsound minecraft:item.totem.use neutral @p[distance=0..10] ~ ~ ~ 0.1
particle minecraft:enchant ~ ~ ~ 0.1 0.1 0.1 1 1 normal
particle minecraft:end_rod ~0.1 ~ ~0.1 0 0 0 1 10
particle minecraft:witch ^ ^0.01 ^0.01 0 0 0 0.15 2
execute as @e[tag=!maximum.pulse,sort=nearest,distance=0.1..2] at @s if entity @s[type=!#satsu_iron_man_addon:items] run damage @s 10 minecraft:player_attack