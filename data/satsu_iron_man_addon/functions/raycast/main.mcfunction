# Inicializa el marcador de distancia
scoreboard players set .distance satsu.iron.man.addon.raycast_distance 0

# Inicia el raycast
execute as @s anchored eyes positioned ^ ^ ^0.1 run function satsu_iron_man_addon:raycast/step