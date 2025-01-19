
scoreboard players set @s satsu.iron.man.choose_armor.anim 0
execute as @s unless score @s satsu.iron.man.choose_armor matches 0.. run scoreboard players set @s satsu.iron.man.choose_armor 1
execute as @s[scores={satsu.iron.man.choose_armor=1}] run title @s actionbar { "translate": "ability.title.satsu.ia.name.1","color":"blue" }