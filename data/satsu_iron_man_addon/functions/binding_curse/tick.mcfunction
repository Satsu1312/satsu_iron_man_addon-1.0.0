# Apply Curse of Binding to suit chest items while armor is enabled; remove it while disabled.
#
# Run ONLY for players who are actually wearing one of our target chest items.
execute as @a if predicate satsu_iron_man_addon:binding_curse/chest_target run function satsu_iron_man_addon:binding_curse/tick_player

