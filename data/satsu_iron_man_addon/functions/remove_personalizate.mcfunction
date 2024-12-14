
scoreboard players add @s satsu.iron.man.personalize.things 1
execute as @s[scores={satsu.iron.man.personalize.things=1}] run title @s actionbar {"text":"Personalize on","color":"#00aaaa"}
execute as @s[scores={satsu.iron.man.personalize.things=2..}] run title @s actionbar {"text":"Personalize Off","color":"#00aaaa"}
execute as @s[scores={satsu.iron.man.personalize.things=2..}] run scoreboard players reset @s satsu.iron.man.personalize.things