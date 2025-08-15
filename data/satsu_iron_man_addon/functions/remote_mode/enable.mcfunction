execute as @s[tag=sentinel.false] run tag @s remove sentinel.false
spawnpoint @s
attribute @s minecraft:generic.max_health base set 10
execute unless score @s[tag=sentinel.false] satsu.iron.man.animation.armor matches 1 run function satsu_iron_man_addon:armor_actived/scoreboard_animation_add_and_decrease
function satsu_iron_man_addon:sentinels/spawn_remote_sentinel
scoreboard players set @s satsu.iron.man.armor.remote 1
function satsu_iron_man_addon:marks_parts/call_parts/give_all/main
execute unless score @s[tag=!sentinel.false] satsu.iron.man.animation.armor matches 1 run function satsu_iron_man_addon:armor_actived/scoreboard_animation_add_and_decrease
execute unless score @s[tag=sentinel.false] satsu.iron.man.animation.armor matches 1 run function satsu_iron_man_addon:armor_actived/scoreboard_animation_add_and_decrease
execute if entity @e[tag=sentinel,sort=nearest,distance=1..] if score @s grave.ID = @e[tag=sentinel,limit=1,sort=nearest] grave.ID as @e[tag=sentinel] run function satsu_iron_man_addon:ia/swap_sentinels
execute if entity @e[tag=sentinel,sort=nearest,distance=1..] if score @s grave.ID = @e[tag=sentinel,limit=1,sort=nearest] grave.ID as @e[tag=sentinel] run function satsu_iron_man_addon:sentinels/kill_one_sentinel