particle explosion_emitter ~ ~ ~ 0 0 0 1 0 normal
particle explosion_emitter ~ ~ ~ 0 0 0 1 0 normal
particle explosion_emitter ~ ~ ~ 0 0 0 1 0 normal
particle explosion_emitter ~ ~ ~ 0 0 0 1 0 normal
particle explosion_emitter ~ ~ ~ 0 0 0 1 0 normal
particle explosion_emitter ~ ~ ~ 0 0 0 1 0 normal
particle explosion_emitter ~ ~ ~ 0 0 0 1 0 normal
particle explosion_emitter ~ ~ ~ 0 0 0 1 0 normal
playsound minecraft:entity.generic.explode neutral @p ~ ~ ~
particle minecraft:explosion_emitter ~ ~ ~
particle minecraft:lava ~0.1 ~ ~0.1 0 0 0 1 10
particle minecraft:campfire_cosy_smoke ^ ^0.01 ^0.01 0 0 0 0.15 40
execute as @e[tag=!maximum.pulse,sort=nearest,distance=0..20] run damage @s 220 minecraft:player_attack