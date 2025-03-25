# Incrementa la distancia
scoreboard players add .distance satsu.iron.man.addon.raycast_distance 1

# Detecta entidades que no compartan el mismo valor en grave.ID
execute as @s positioned ^ ^ ^0.1 as @e[distance=..1,sort=nearest,limit=1] run superpower add satsu_iron_man_addon:armor_stand_design/armor_stand_desing_pass @s
execute as @s positioned ^ ^ ^0.1 as @e[distance=..1,sort=nearest,limit=1] run tag @s remove design_armor_stand

# Detiene el raycast si alcanza el límite
execute if score .distance satsu.iron.man.addon.raycast_distance matches 50..

# Continua el raycast si no se ha alcanzado el límite
execute if score .distance satsu.iron.man.addon.raycast_distance matches ..49 positioned ^ ^ ^0.1 run function satsu_iron_man_addon:raycast/set_armor_design/step