team add ark_enemies
team modify ark_enemies color blue
effect give @e[tag=!not.mee.scan,distance=0..30] minecraft:glowing
execute as @e[tag=!not.mee.scan,distance=0..30] run team join ark_enemies @s
scoreboard objectives add ark_enemies dummy
scoreboard players set @e[team=ark_enemies] ark_enemies 1
scoreboard objectives setdisplay sidebar ark_enemies