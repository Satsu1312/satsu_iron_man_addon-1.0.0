
      
scoreboard players add @s satsu.iron.man.addon.give.ia.tarjet 1
execute as @s[scores={satsu.iron.man.addon.give.ia.tarjet=1}] run give @s satsu_iron_man_addon:ia_tarjet 1
execute as @s[scores={satsu.iron.man.addon.give.ia.tarjet=1}] run scoreboard players reset @s satsu.iron.man.addon.ia.name.power
execute as @s[scores={satsu.iron.man.addon.give.ia.tarjet=2..}] run scoreboard players reset @s satsu.iron.man.addon.give.ia.tarjet
execute as @s run superpower remove satsu_iron_man_addon:ia_stuff/ia @s
execute as @s run superpower remove satsu_iron_man_addon:ia_stuff/ia_voice_commands @s
ability lock @s satsu_iron_man_addon:ia_stuff/ia remove.ia.tarjet