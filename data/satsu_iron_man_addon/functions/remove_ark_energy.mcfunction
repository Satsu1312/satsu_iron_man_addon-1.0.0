execute as @s[scores={satsu.iron.man.armor.actived.perm=1}] as @s[scores={satsu.iron.man.armor.ark.energy=1..10000}] run scoreboard players remove @s satsu.iron.man.armor.ark.energy 1
execute as @s unless score @s satsu.iron.man.armor.actived.perm matches 1.. as @s[scores={satsu.iron.man.armor.ark.energy=0..9999}] run scoreboard players add @s satsu.iron.man.armor.ark.energy 1
execute as @s[scores={satsu.iron.man.armor.ark.energy=0}] run title @a actionbar {"text":"IA: Energy low","color":"#00aaaa"}
execute as @s[scores={satsu.iron.man.armor.ark.energy=5000..10000}] run scoreboard players set @s satsu.iron.man.armor.ark_energy_full_or_off 1
execute as @s[scores={satsu.iron.man.armor.ark.energy=0..5000}] run scoreboard players set @s satsu.iron.man.armor.ark_energy_full_or_off 0
scoreboard players reset @s[scores={satsu.iron.man.armor.ark.energy=0}] satsu.iron.man.armor.actived.perm
scoreboard players reset @s[scores={satsu.iron.man.armor.ark.energy=0}] satsu.iron.man.armor.actived