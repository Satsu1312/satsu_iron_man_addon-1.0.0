// Register custom animations
PalladiumEvents.registerAnimations((event) => {
  event.register("satsu_iron_man_addon/mark.1_fly", 10, (builder) => {
    // Gets the current animation timer progress from the ability, returned value is a number from 0.0 to 1.0
    const progress = animationUtil.getAnimationTimerAbilityValue(
      builder.getPlayer(),
      "satsu_iron_man_addon:marks/mark_1/main",
      "mark_1_fly",
      builder.getPartialTicks()
    );

    // only apply animation if progress is above 0!
    if (
      progress > 0 &&
      !builder.isFirstPerson() &&
      !builder.getPlayer().isSwimming()
    )
      if (progress > 0.0) {
        const halfPi = 1.57079632679;
        {
          // third person animations
          builder
            .get("left_arm")
            .setXRotDegrees(0)
            .setYRotDegrees(0)
            .setZRotDegrees(-10)
            .moveX(0)
            .moveY(0)
            .moveZ(0)
            .animate("InOutCubic", progress);
          builder
            .get("right_arm")
            .setXRotDegrees(0)
            .setYRotDegrees(0)
            .setZRotDegrees(10)
            .moveX(0)
            .moveY(0)
            .moveZ(0)
            .animate("InOutCubic", progress);
          builder
            .get("chest")
            .setXRotDegrees(0)
            .setYRotDegrees(0)
            .setZRotDegrees(0)
            .moveX(0)
            .moveY(0)
            .moveZ(0)
            .animate("InOutCubic", progress);
          builder
            .get("left_leg")
            .setXRotDegrees(0)
            .setYRotDegrees(0)
            .setZRotDegrees(-5)
            .moveX(0)
            .moveY(0)
            .moveZ(0)
            .animate("InOutCubic", progress);
          builder
            .get("right_leg")
            .setXRotDegrees(0)
            .setYRotDegrees(0)
            .setZRotDegrees(5)
            .moveX(0)
            .moveY(0)
            .moveZ(0)
            .animate("InOutCubic", progress);
          builder;
        }
      }
  });
});
