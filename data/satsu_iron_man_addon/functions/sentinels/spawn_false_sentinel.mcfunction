
scoreboard players add @s satsu.iron.man.addon.enable.sentinel 1
scoreboard players add @s satsu.iron.man.addon.enable.sentinel 1
execute if entity @s[tag=grave.facing.west] run summon wolf ~-1 ~1.5 ~ {CustomNameVisible:1b,CustomName:'{"translate":"satsu.iron.man.addon.entity.name.armor.sentinel"}',Silent:1b,Tags:["tamed_wolf","new","sentinel"]}
execute if entity @s[tag=grave.facing.east] run summon wolf ~1 ~1.5 ~ {CustomNameVisible:1b,CustomName:'{"translate":"satsu.iron.man.addon.entity.name.armor.sentinel"}',Silent:1b,Tags:["tamed_wolf","new","sentinel"]}
execute if entity @s[tag=grave.facing.north] run summon wolf ~ ~1.5 ~-1 {CustomNameVisible:1b,CustomName:'{"translate":"satsu.iron.man.addon.entity.name.armor.sentinel"}',Silent:1b,Tags:["tamed_wolf","new","sentinel"]}
execute if entity @s[tag=grave.facing.south] run summon wolf ~ ~1.5 ~1 {CustomNameVisible:1b,CustomName:'{"translate":"satsu.iron.man.addon.entity.name.armor.sentinel"}',Silent:1b,Tags:["tamed_wolf","new","sentinel"]}
execute as @e[type=wolf,tag=sentinel] run superpower add satsu_iron_man_addon:ia_stuff/sentinel_stats @s
function satsu_iron_man_addon:spawn_armor_sentinel
execute if entity @s[tag=grave.facing.west] run summon armor_stand ~-1 ~1.5 ~ {Marker:1b,Invisible:1b,Invulnerable:1b,Silent:1b,NoBasePlate:1b,CustomName:'{"translate":"satsu.iron.man.addon.entity.name.armor.sentinel"}',NoGravity:1b,Tags:["sentinel"],Pose:{Body:[0f,0f,0f],LeftArm:[0f,0f,0f],RightArm:[0f,0f,0f],LeftLeg:[0f,0f,0f],RightLeg:[0f,0f,0f],Head:[0f,0f,0f]}}
execute if entity @s[tag=grave.facing.east] run summon armor_stand ~1 ~1.5 ~ {Marker:1b,Invisible:1b,Invulnerable:1b,Silent:1b,NoBasePlate:1b,CustomName:'{"translate":"satsu.iron.man.addon.entity.name.armor.sentinel"}',NoGravity:1b,Tags:["sentinel"],Pose:{Body:[0f,0f,0f],LeftArm:[0f,0f,0f],RightArm:[0f,0f,0f],LeftLeg:[0f,0f,0f],RightLeg:[0f,0f,0f],Head:[0f,0f,0f]}}
execute if entity @s[tag=grave.facing.north] run summon armor_stand ~ ~1.5 ~-1 {Marker:1b,Invisible:1b,Invulnerable:1b,Silent:1b,NoBasePlate:1b,CustomName:'{"translate":"satsu.iron.man.addon.entity.name.armor.sentinel"}',NoGravity:1b,Tags:["sentinel"],Pose:{Body:[0f,0f,0f],LeftArm:[0f,0f,0f],RightArm:[0f,0f,0f],LeftLeg:[0f,0f,0f],RightLeg:[0f,0f,0f],Head:[0f,0f,0f]}}
execute if entity @s[tag=grave.facing.south] run summon armor_stand ~ ~1.5 ~1 {Marker:1b,Invisible:1b,Invulnerable:1b,Silent:1b,NoBasePlate:1b,CustomName:'{"translate":"satsu.iron.man.addon.entity.name.armor.sentinel"}',NoGravity:1b,Tags:["sentinel"],Pose:{Body:[0f,0f,0f],LeftArm:[0f,0f,0f],RightArm:[0f,0f,0f],LeftLeg:[0f,0f,0f],RightLeg:[0f,0f,0f],Head:[0f,0f,0f]}}
execute as @e[type=minecraft:armor_stand,tag=sentinel,limit=1,sort=nearest] run superpower add satsu_iron_man_addon:ia_stuff/iron_man_sentinel @s
execute as @e[tag=sentinel,sort=nearest] unless score @s grave.ID matches 0.. run scoreboard players operation @s grave.ID = @p grave.ID
execute as @e[tag=sentinel,sort=nearest] if score @s grave.ID = @p grave.ID unless score @s satsu.iron.man.armor matches 0.. run scoreboard players operation @s satsu.iron.man.armor = @p satsu.iron.man.armor
execute as @e[tag=sentinel,sort=nearest] if score @s grave.ID = @p grave.ID unless score @s satsu.iron.man.mask matches 0.. run scoreboard players operation @s satsu.iron.man.mask = @p satsu.iron.man.mask
scale set pehkui:hitbox_height 2 @e[type=wolf,tag=sentinel,sort=nearest,limit=1]
ride @e[type=minecraft:armor_stand,tag=sentinel,limit=1,sort=nearest] mount @e[type=minecraft:wolf,tag=sentinel,limit=1,sort=nearest]
scale set pehkui:hitbox_width 2 @e[type=wolf,tag=sentinel,sort=nearest,limit=1]