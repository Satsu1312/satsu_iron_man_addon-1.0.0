function satsu_iron_man_addon:dummy
function satsu_iron_man_addon:ia/tp_sentinel
superpower add satsu_iron_man_addon:kube_animations @p[scores={satsu.iron.man.superpower=0}]
superpower add satsu_iron_man_addon:armor_principal/iron_man_armor @p[scores={satsu.iron.man.superpower=0}]
execute as @p[scores={satsu.iron.man.addon.ia.name.power=1}] run superpower add satsu_iron_man_addon:ia_stuff/ia_only_armor @s
execute as @p at @s store result score @s satsu.iron.man.addon.altura run data get entity @s Pos[1]
