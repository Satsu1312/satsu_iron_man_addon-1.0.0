execute as @s[tag=sentinel.false] run tag @s remove sentinel.false
spawnpoint @s
attribute @s minecraft:generic.max_health base set 10
superpower add satsu_iron_man_addon:armor/remote/enable @s[tag=sentinel.false]
function satsu_iron_man_addon:sentinels/spawn_remote_sentinel
scoreboard players set @s satsu.iron.man.armor.remote 1
superpower add satsu_iron_man_addon:armor/parts/throw/all/set
superpower add satsu_iron_man_addon:armor/remote/enable @s[tag=!sentinel.false]
superpower add satsu_iron_man_addon:armor/remote/enable @s[tag=sentinel.false]
execute if entity @e[tag=sentinel,sort=nearest,distance=1..] if score @s grave.ID = @e[tag=sentinel,limit=1,sort=nearest] grave.ID as @e[tag=sentinel] run function satsu_iron_man_addon:ia/swap_sentinels
execute if entity @e[tag=sentinel,sort=nearest,distance=1..] if score @s grave.ID = @e[tag=sentinel,limit=1,sort=nearest] grave.ID as @e[tag=sentinel] run function satsu_iron_man_addon:sentinels/kill_one_sentinel