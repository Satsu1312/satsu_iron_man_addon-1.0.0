(function () {
  StartupEvents.registry("palladium:abilities", (event) => {
    event
      .create("satsu_iron_man_addon:ability_list")
      .icon(palladium.createItemIcon("palladium:vibranium_circuit"))
      .addProperty("range", "float", 10.0, "The max range the target can be.")

      .tick((entity, entry, holder, enabled) => {
        if (!enabled) return;

        let range = entry.getPropertyByName("range");
        let target = entity.rayTrace(range).entity;

        let blacklist = ["namespace:power_name"];

        if (target && target.isAlive() && target != entity) {
          let powers = palladium.powers.getPowerIds(target);

          entity.server.runCommandSilent(
            `execute as ${entity.name.string} run tellraw @s [{"text":"Target: ","color":"gray"},{"text":"${target.name.string}","color":"white"}]`,
          );

          entity.server.runCommandSilent(
            `execute as ${entity.name.string} run tellraw @s [{"text":"Health: ","color":"gray"},{"text":"${target.health} / ${target.maxHealth}","color":"red"}]`,
          );

          powers.forEach((power) => {
            let powerId = power.toString();

            if (!blacklist.includes(powerId)) {
              entity.server.runCommandSilent(
                `execute as ${entity.name.string} run tellraw @s [{"text":"Power: ","color":"gray"},{"text":"${powerId}","color":"yellow"}]`,
              );
            }
          });
        }
      });
  });
})();