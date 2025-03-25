# Incrementa la distancia
scoreboard players add .distance satsu.iron.man.addon.raycast_distance 1

# Detecta entidades que no compartan el mismo valor en grave.ID
execute as @s positioned ^ ^ ^0.1 if entity @e[distance=..1,sort=nearest] unless score @s grave.ID = @e[distance=..1,sort=nearest,limit=1] grave.ID run say Entidad detectada con un ID diferente

# Detiene el raycast si alcanza el límite
execute if score .distance satsu.iron.man.addon.raycast_distance matches 50.. run say Fin del raycast

# Continua el raycast si no se ha alcanzado el límite
execute if score .distance satsu.iron.man.addon.raycast_distance matches ..49 positioned ^ ^ ^0.1 run function satsu_iron_man_addon:raycast/step