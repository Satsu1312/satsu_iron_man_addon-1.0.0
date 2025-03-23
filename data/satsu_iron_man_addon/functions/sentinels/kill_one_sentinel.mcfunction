
execute as @e[tag=sentinel,limit=2,distance=0..3] run data modify entity @s Owner set value [I; 0, 0, 0, 0]
execute as @e[tag=sentinel,limit=2,distance=0..3] run tp @s ~ ~-1000 ~
execute as @e[tag=sentinel,limit=2] run kill @s
scoreboard players reset @s satsu.iron.man.addon.enable.sentinel