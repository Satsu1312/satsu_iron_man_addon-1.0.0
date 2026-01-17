// Register custom animations
PalladiumEvents.registerAnimations((event) => {
  event.registerForPower("satsu_iron_man_addon/war_machine/marks/mark_3/war_hammer",
      "satsu_iron_man_addon:war_machine/marks/mark_3/main", 10, (builder) => {
    // Gets the current animation timer progress from the ability, returned value is a number from 0.0 to 1.0
    const progress = animationUtil.getAnimationTimerAbilityValue(
      builder.getPlayer(),
      "satsu_iron_man_addon:war_machine/marks/mark_3/main",
      "war_hammer",
      builder.getPartialTicks()
    );

    // only apply animation if progress is above 0!
    if (progress > 0.0) {
      const halfPi = 1.57079632679;

      // if first person
      if (builder.isFirstPerson()) {
        builder
          .get("left_arm")
          .setXRotDegrees(0)
          .setYRotDegrees(0)
          .setZRotDegrees(0)
          .animate("InOutCubic", progress);
      }
      if (builder.isFirstPerson()) {
        builder
          .get("right_arm")
          .setXRotDegrees(0)
          .setYRotDegrees(25)
          .setZRotDegrees(0)
          .animate("InOutCubic", progress);
      } else {
        // third person animations
        builder
          .get("right_arm")
          .setXRotDegrees(-246.8458858471)
          .setYRotDegrees(40.1148478454)
          .setZRotDegrees(-15.4053364382)
          .animate("InOutCubic", progress);
        builder;
      }
    }
  });
});