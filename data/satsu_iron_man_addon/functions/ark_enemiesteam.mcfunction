team add enemies
scoreboard objectives add enemies dummy
execute store result score @s enemies run team list enemies
team modify enemies color blue
execute as @e[type=!palladium:custom_projectile,tag=!not.mee.scan,distance=0..30] run team join enemies @s
execute as @e[type=!palladium:custom_projectile,team=enemies,distance=0..30] run tag @s add ark_enemy
effect give @e[type=!palladium:custom_projectile,team=enemies,tag=!not.mee.scan,distance=0..20] minecraft:glowing 1 255 true