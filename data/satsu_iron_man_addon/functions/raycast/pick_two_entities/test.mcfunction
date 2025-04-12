# Aplica daño a la entidad detectada
execute if entity @e[distance=..1,sort=nearest] unless score @s grave.ID = @e[distance=..1,sort=nearest,limit=1] grave.ID as @e[distance=..1,sort=nearest,limit=2] run tag @s add grave.pick.picked

# Puedes añadir otros efectos si lo deseas
execute as @s run tag @s remove grave.pick.picked
# Detiene el raycast al encontrar la entidad