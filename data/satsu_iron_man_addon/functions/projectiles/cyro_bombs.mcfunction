particle minecraft:snowflake ~ ~ ~
particle minecraft:snowflake ~ ~ ~
particle minecraft:snowflake ~ ~ ~
playsound block.packed_mud.break neutral @p[distance=0..30] ~ ~ ~ 1 0.5
execute as @e[type=!palladium:custom_projectile,tag=!maximum.pulse,sort=nearest,distance=0..20] at @s if entity @s[type=!#satsu_iron_man_addon:items] run effect give @s satsu_iron_man_addon:cyro_freeze 8 1 false