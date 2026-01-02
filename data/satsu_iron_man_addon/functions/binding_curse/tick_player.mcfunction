# Per-player binding curse handler. Runs ONLY when the player is wearing a chest item
# from #satsu_iron_man_addon:binding_curse_chests (see binding_curse/chest_target predicate).

# Enabled: add curse (idempotent) + hide enchant tooltip
execute if score @s satsu.iron.man.armor.actived matches 1.. run item modify entity @s armor.chest satsu_iron_man_addon:binding_curse/add
execute if score @s satsu.iron.man.armor.actived matches 1.. if predicate satsu_iron_man_addon:binding_curse/chest_target_with_curse run item modify entity @s armor.chest satsu_iron_man_addon:binding_curse/hide

# Disabled: clear enchantments (removes binding) + reset HideFlags
execute unless score @s satsu.iron.man.armor.actived matches 1.. if predicate satsu_iron_man_addon:binding_curse/chest_target_with_curse run item modify entity @s armor.chest satsu_iron_man_addon:binding_curse/clear

# Best-effort: stop generic armor equip sound on modify/clear
stopsound @s player minecraft:item.armor.equip_generic

