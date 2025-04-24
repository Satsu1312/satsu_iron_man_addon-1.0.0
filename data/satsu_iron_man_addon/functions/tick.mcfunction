kill @e[tag=sentinel_kill]
function satsu_iron_man_addon:dummy
function satsu_iron_man_addon:ia/tp_sentinel
execute as @a unless entity @s[palladium.power=satsu_iron_man_addon:kube_animations] run superpower add satsu_iron_man_addon:kube_animations
execute as @p at @s store result score @s satsu.iron.man.addon.Ymotion run data get entity @s Motion[1]
