StartupEvents.registry("palladium:abilities", (event) => {
  event
    .create("satsu_iron_man_addon:mastery_gain_prop")
    .addProperty(
      "prop",
      "string",
      "posthuman.flameMastery",
      "the name of the mastery property"
    )
    .addProperty("amount", "integer", 1, "amount to adjust by")
    .addProperty(
      "power",
      "string",
      "flame",
      "the name of the power to check for affinity tags"
    )
    .addProperty(
      "pos_mult",
      "float",
      1.5,
      "multiplier if positive tag is present"
    )
    .addProperty(
      "neg_mult",
      "float",
      2,
      "multiplier if negative tag is present"
    )
    .addProperty("lvl_mult", "float", 0.1, "multiplier based on current level")
    .addProperty(
      "forgiveness",
      "string",
      "nice",
      "nice = increase exp gain for higher levels, hard = decrease exp gain for higher levels"
    )
    .tick((entity, entry, holder, enabled) => {
      if (enabled && entity.isPlayer()) {
        const prop = entry.getPropertyByName("prop");
        let power = entry.getPropertyByName("power");
        let forgiveness = entry.getPropertyByName("forgiveness");
        let lvlMult =
          entry.getPropertyByName("lvl_mult") *
          palladium.getProperty(entity, "posthuman." + power + "Level");
        let hardAmount = entry.getPropertyByName("amount") * lvlMult;
        let niceAmount = entry.getPropertyByName("amount") + hardAmount;
        let pos_tag = "posthuman." + power + "PosAffinity";
        let neg_tag = "posthuman." + power + "NegAffinity";
        let pos_mult = entry.getPropertyByName("pos_mult");
        let neg_mult = entry.getPropertyByName("neg_mult");
        if (!entity.tags.contains(pos_tag) && !entity.tags.contains(neg_tag)) {
          if (forgiveness === "nice") {
            palladium.setProperty(
              entity,
              prop,
              palladium.getProperty(entity, prop) + niceAmount
            );
          } else {
            palladium.setProperty(
              entity,
              prop,
              palladium.getProperty(entity, prop) + hardAmount
            );
          }
        } else if (entity.tags.contains(pos_tag)) {
          if (forgiveness === "nice") {
            palladium.setProperty(
              entity,
              prop,
              palladium.getProperty(entity, prop) + niceAmount * pos_mult
            );
          } else {
            palladium.setProperty(
              entity,
              prop,
              palladium.getProperty(entity, prop) + hardAmount * pos_mult
            );
          }
        } else if (entity.tags.contains(neg_tag)) {
          if (forgiveness === "nice") {
            palladium.setProperty(
              entity,
              prop,
              palladium.getProperty(entity, prop) + niceAmount * neg_mult
            );
          } else {
            palladium.setProperty(
              entity,
              prop,
              palladium.getProperty(entity, prop) + hardAmount * neg_mult
            );
          }
        }
      }
    });
});
