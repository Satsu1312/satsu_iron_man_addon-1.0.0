
execute as @e[tag=sentinel] if score @s grave.ID = @p grave.ID if score @s satsu.iron.man.armor = @p satsu.iron.man.armor run tp @s ~ ~-1000 ~
execute as @e[tag=sentinel] if score @s grave.ID = @p grave.ID if score @s satsu.iron.man.armor = @p satsu.iron.man.armor run data modify entity @s Owner set value [I; 0, 0, 0, 0]
execute as @e[tag=sentinel] if score @s grave.ID = @p grave.ID if score @s satsu.iron.man.armor = @p satsu.iron.man.armor run kill @s
scoreboard players reset @s satsu.iron.man.addon.enable.sentinel