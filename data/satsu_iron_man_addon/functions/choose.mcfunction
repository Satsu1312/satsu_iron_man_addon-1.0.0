
scoreboard players set @s satsu.prev.iron.man.armor.anim 0
execute as @s unless score @s satsu.prev.iron.man.armor matches 0.. run scoreboard players set @s satsu.prev.iron.man.armor 0
execute as @s[scores={satsu.prev.iron.man.armor=0}] run title @s actionbar {"text":"MK 47 armor","color":"blue"}
execute as @s[scores={satsu.prev.iron.man.armor=1}] run title @s actionbar {"text":"superior armor","color":"blue"}
execute as @s[scores={satsu.prev.iron.man.armor=1}] unless score @s satsu.iron.man.mask matches 0.. run scoreboard players set @s satsu.iron.man.mask 0
execute as @s[scores={satsu.prev.iron.man.armor=2}] run title @s actionbar {"text":"MK 43 armor","color":"blue"}
execute as @s[scores={satsu.prev.iron.man.armor=3}] run title @s actionbar {"text":"unknow Armor","color":"blue"}
execute as @s[scores={satsu.prev.iron.man.armor=4}] run title @s actionbar {"text":"unknow Armor","color":"blue"}
execute as @s[scores={satsu.prev.iron.man.armor=5}] run title @s actionbar {"text":"unknow Armor","color":"blue"}
execute as @s[scores={satsu.prev.iron.man.armor=6}] run title @s actionbar {"text":"Stealh Armor","color":"blue"}
execute as @s[scores={satsu.prev.iron.man.armor=7}] run title @s actionbar {"text":"MK43 Rivals Armor","color":"blue"}
execute as @s[scores={satsu.prev.iron.man.armor=8}] run title @s actionbar {"text":"Midas","color":"blue"}
execute as @s[scores={satsu.prev.iron.man.armor=9}] run title @s actionbar {"text":"MK40","color":"blue"}
execute as @s[scores={satsu.prev.iron.man.armor=10}] run title @s actionbar {"text":"unknow Armor","color":"blue"}
execute as @s[scores={satsu.prev.iron.man.armor=11}] run title @s actionbar {"text":"MK 50","color":"blue"}
execute as @s[scores={satsu.prev.iron.man.armor=12}] run title @s actionbar {"text":"unknow Armor (X)","color":"blue"}