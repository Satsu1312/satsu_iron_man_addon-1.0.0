const TIMER = "posthuman.timer";
const FLAMECOLOUR = "posthuman.flameColour";
const FLAMELEVEL = "posthuman.flameLevel";
const FLAMEMASTERY = "posthuman.flameMastery";
const FLAMEMAX = "posthuman.flameMax";
PalladiumEvents.registerProperties((event) => {
  if (event.getEntityType() === "minecraft:player") {
    event.registerProperty(TIMER, "integer", 0);
    event.registerProperty(FLAMECOLOUR, "integer", 0);
    event.registerProperty(FLAMELEVEL, "integer", 0);
    event.registerProperty(FLAMEMASTERY, "float", 0),
      event.registerProperty(FLAMEMAX, "float", 500);
  }
});
