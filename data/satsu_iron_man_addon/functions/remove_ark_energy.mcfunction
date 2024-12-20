execute as @s[scores={satsu.iron.man.armor.actived.perm=1}] as @s[scores={satsu.iron.man.armor.ark.energy=1..10000}] as @s[scores={satsu.iron.man.armor=0}] run scoreboard players remove @s satsu.iron.man.armor.ark.energy 1
execute as @s[scores={satsu.iron.man.armor.actived.perm=1}] as @s[scores={satsu.iron.man.armor.ark.energy=1..10000}] as @s[scores={satsu.iron.man.armor=2..}] run scoreboard players remove @s satsu.iron.man.armor.ark.energy 1
execute as @s unless score @s satsu.iron.man.armor.actived.perm matches 1.. as @s[scores={satsu.iron.man.armor.ark.energy=0..9999}] run scoreboard players add @s satsu.iron.man.armor.ark.energy 1
execute as @s[scores={satsu.iron.man.armor.ark.energy=0}] run title @a actionbar {"text":"IA: Energy low","color":"#00aaaa"}
execute as @s[scores={satsu.iron.man.armor.ark.energy=10000}] run title @a actionbar {"text":"IA: Energy Full Recharged","color":"#00aaaa"}
execute as @s[scores={satsu.iron.man.armor.ark.energy=9998..10000}] run scoreboard players set @s satsu.iron.man.armor.ark_energy_full_or_off 1
execute as @s[scores={satsu.iron.man.armor.ark.energy=500..5000}] run scoreboard players set @s satsu.iron.man.armor.ark_energy_full_or_off 0
execute as @s[scores={satsu.iron.man.armor.ark.energy=5000..9998}] run scoreboard players set @s satsu.iron.man.armor.ark_energy_full_or_off 2
execute as @s[scores={satsu.iron.man.armor.ark.energy=0..200}] run scoreboard players set @s satsu.iron.man.armor.ark_energy_full_or_off 3
scoreboard players reset @s[scores={satsu.iron.man.armor.ark.energy=0}] satsu.iron.man.armor.actived.perm
scoreboard players reset @s[scores={satsu.iron.man.armor.ark.energy=0}] satsu.iron.man.armor.actived