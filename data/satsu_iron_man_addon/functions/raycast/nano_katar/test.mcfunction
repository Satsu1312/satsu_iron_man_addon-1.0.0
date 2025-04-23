# Aplica daño a la entidad detectada
execute if entity @e[distance=..1,sort=nearest] unless score @s grave.ID = @e[distance=..1,sort=nearest,limit=1] grave.ID as @e[distance=..1,sort=nearest,limit=1] run damage @s 20

# Puedes añadir otros efectos si lo deseas
execute if entity @e[distance=..1,sort=nearest] unless score @s grave.ID = @e[distance=..1,sort=nearest,limit=1] grave.ID as @e[distance=..1,sort=nearest,limit=1] run effect give @s minecraft:weakness 10 1

# Detiene el raycast al encontrar la entidad