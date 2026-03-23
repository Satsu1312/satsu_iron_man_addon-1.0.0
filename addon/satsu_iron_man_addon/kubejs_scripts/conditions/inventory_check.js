StartupEvents.registry('palladium:condition_serializer', (event) => {
    event.create('satsu_iron_man_addon:inventory_check')

    //property 
    .addProperty("item", "string", null, "The item you want")
    .addProperty("amount", "integer", 1, "The amount of the item you want")

    .test((entity, properties) => {
        if (!entity || !entity.isPlayer()) return false;

        const itemId = properties.get("item");

        if (itemId == null) return false;

        const amountNeeded = properties.get("amount");
        const count = entity.getInventory().count(Item.of(itemId));

        return count >= amountNeeded;
    });

});