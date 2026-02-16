//Made by Codecreality
StartupEvents.registry("palladium:abilities", (event) => {
  event
    .create("satsu_iron_man_addon:destroy_block")
    .icon(palladium.createItemIcon("minecraft:stone"))
    .documentationDescription("destroy block ability")
    .addProperty("range", "float", 2, "range of ability")
    .addProperty(
      "excluded_tag",
      "string",
      "minecraft:air",
      "name of the excluded tag"
    )
    .addProperty(
      "blockset",
      "string",
      "minecraft:air",
      "name of the block to set"
    )
    .addProperty("destroy", "string", "destroy", "keep, destroy or replace")
    .tick((entity, entry, holder, enabled) => {
      if (enabled && entity.isPlayer()) {
        const excluded_tag = entry.getPropertyByName("excluded_tag");
        const blockset = entry.getPropertyByName("blockset");
        const destroy = entry.getPropertyByName("destroy");
        let range = entry.getPropertyByName("range");
        let block = entity.rayTrace(range).block;
        if (block !== null) {
          block.level.runCommandSilent(
            `execute unless block ${block.x} ${block.y} ${block.z} ${excluded_tag} run setblock ${block.x} ${block.y} ${block.z} ${blockset} ${destroy}`
          );
        }
      }
    });
});
