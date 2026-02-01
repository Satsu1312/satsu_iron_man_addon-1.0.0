// Register custom animations
PalladiumEvents.registerAnimations((event) => {
  event.registerForPower(
    "satsu_iron_man_addon/extremis_explosion.1",
    "satsu_iron_man_addon:extremis/main",
    10,
    (builder) => {
      // Gets the current animation timer progress from the ability, returned value is a number from 0.0 to 1.0
      const progress = animationUtil.getAnimationTimerAbilityValue(
        builder.getPlayer(),
        "satsu_iron_man_addon:extremis/main",
        "extremis_explosion",
        builder.getPartialTicks(),
        0,
        3
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
            .setYRotDegrees(0)
            .setZRotDegrees(0)
            .animate("InOutCubic", progress);
        } else {
          // third person animations
          builder
            .get("left_arm")
            .setZRotDegrees(-90)
            .animate("InOutCubic", progress);
          builder
            .get("right_arm")
            .setZRotDegrees(90)
            .animate("InOutCubic", progress);
        }
      }
    }
  );
  event.registerForPower(
    "satsu_iron_man_addon/extremis_explosion.2",
    "satsu_iron_man_addon:extremis/main",
    10,
    (builder) => {
      // Gets the current animation timer progress from the ability, returned value is a number from 0.0 to 1.0
      const progress = animationUtil.getAnimationTimerAbilityValue(
        builder.getPlayer(),
        "satsu_iron_man_addon:extremis/main",
        "extremis_explosion",
        builder.getPartialTicks(),
        4,
        6
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
            .setYRotDegrees(0)
            .setZRotDegrees(0)
            .animate("InOutCubic", progress);
        } else {
          // third person animations
          builder
            .get("left_arm")
            .setXRotDegrees(-112.5)
            .setZRotDegrees(-90)
            .animate("InOutCubic", progress);
          builder
            .get("right_arm")
            .setXRotDegrees(-115)
            .setZRotDegrees(90)
            .animate("InOutCubic", progress);
        }
      }
    }
  );
});
