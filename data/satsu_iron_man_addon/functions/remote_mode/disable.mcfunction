
attribute @s minecraft:generic.max_health base set 20
execute if entity @e[tag=sentinel.test,distance=0..30] run function satsu_iron_man_addon:sentinels/spawn_false_sentinel_on_ground
execute if entity @e[tag=sentinel.test,distance=0..30] run tag @s add give.sentinel.one
superpower add satsu_iron_man_addon:armor/activated
execute as @e[tag=sentinel.test] if score @s grave.ID = @p grave.ID run function satsu_iron_man_addon:ia/swap_sentinels
execute as @e[tag=sentinel.test] if score @s grave.ID = @p grave.ID run kill @s
scoreboard players reset @s satsu.iron.man.armor.remote