global.timeOfHit = (entity) => {
  if (!entity.persistentData?.lastDamageAmount) return;
  let attackDamage = entity.persistentData.lastDamageAmount;

  let hitTime = entity.persistentData.hitTime;
  let now = Math.floor(Date.now());
  let difference = (now - hitTime) / 50;

  return difference;
};

StartupEvents.registry("palladium:condition_serializer", (event) => {
  event
    .create("satsu_iron_man_addon:is_hurt")

    //property
    .addProperty(
      "min_damage",
      "integer",
      1,
      "the minimum damage that needs to be taken to activate the ability",
    )

    .test((entity, properties) => {
      if (!entity || !entity.isPlayer()) return false;

      const mindamageAmount = properties.get("min_damage");
      const attackDamage = entity.persistentData.lastDamageAmount;
      if (attackDamage < mindamageAmount) return false;
      return global.timeOfHit(entity) >= 1;
    });
});
