# Aplica daño a la entidad detectada
execute if entity @e[distance=..1,sort=nearest] unless score @s grave.ID = @e[distance=..1,sort=nearest,limit=1] grave.ID as @e[distance=..1,sort=nearest,limit=1] run damage @s 28
execute if entity @e[distance=..1,sort=nearest] unless score @s grave.ID = @e[distance=..1,sort=nearest,limit=1] grave.ID as @e[distance=..1,sort=nearest,limit=1] run playsound minecraft:entity.generic.explode ambient @a[distance=0..10] ~ ~ ~ 1 1.5


# Puedes añadir otros efectos si lo deseas

# Detiene el raycast al encontrar la entidad