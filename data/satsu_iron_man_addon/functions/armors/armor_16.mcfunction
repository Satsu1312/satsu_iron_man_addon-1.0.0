
execute as @s[scores={satsu.iron.man.armor=16}] run scoreboard players set @s satsu.iron.man.flame 10
execute as @s[scores={satsu.iron.man.armor=16}] run scoreboard players set @s satsu.iron.man.durability 20
execute as @s[scores={satsu.iron.man.armor=16}] run scoreboard players set @s satsu.iron.man.strength 7
execute as @s unless score @s satsu.iron.man.armor.set matches 0.. as @s[scores={satsu.iron.man.armor.actived=1..}] as @s[scores={satsu.iron.man.armor.actived=1..}] run tag @s add mark.unknow.blooded.armor
execute as @s unless score @s satsu.iron.man.armor.set matches 0.. as @s[scores={satsu.iron.man.armor.actived.perm=1..}] run tag @s add mark.unknow.blooded.armor
execute as @s[scores={satsu.iron.man.armor.actived=0}] run tag @s remove mark.unknow.blooded.armor
execute as @s[scores={satsu.iron.man.armor.actived.perm=0}] run tag @s remove mark.unknow.blooded.armor