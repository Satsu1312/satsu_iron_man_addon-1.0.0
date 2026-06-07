StartupEvents.registry("palladium:condition_serializer", (event) => {
  event
    .create("satsu_iron_man_addon:block_check")
    .addProperty(
      "check_which_block",
      "string",
      "minecraft:stone",
      "The block you are in or on."
    )
    .test((entity, props) => {
      if (!entity || !entity.level) {
        return false;
      }
      const blockID = props.check_which_block;
      const level = entity.level;
      const adjacentPositions = [
        entity.blockPosition(),
        entity.blockPosition().below(),
      ];
      for (const pos of adjacentPositions) {
        if (level.getBlock(pos).id === blockID) {
          return true;
        }
      }
      return false;
    });
});
//Made by Mr_Fuuu
