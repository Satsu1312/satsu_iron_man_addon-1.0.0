
execute as @e[tag=sentinel,limit=2,sort=nearest] run fill ~5 ~5 ~5 ~-5 ~-5 ~-5 air replace light[level=10]
execute as @e[tag=sentinel,limit=2,sort=nearest] run tag @s add sentinel_kill
execute as @e[tag=sentinel,limit=2,sort=nearest] run data modify entity @s Owner set value [I; 0, 0, 0, 0]
execute as @e[tag=sentinel,limit=2,sort=nearest] run tp @s ~ ~-1000 ~
scoreboard players reset @s satsu.iron.man.addon.enable.sentinel