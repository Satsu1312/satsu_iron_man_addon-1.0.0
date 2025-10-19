// Register custom animations
PalladiumEvents.registerAnimations((event) => {
  event.registerForPower("satsu_iron_man_addon/clap_smoke_hands.1",
      "satsu_iron_man_addon:iron_man/marks/mark_1873_nano/main", 10, (builder) => {
    // Gets the current animation timer progress from the ability, returned value is a number from 0.0 to 1.0
    const progress = animationUtil.getAnimationTimerAbilityValue(
      builder.getPlayer(),
      "satsu_iron_man_addon:iron_man/marks/mark_1873_nano/main",
      "mark.1873.clap_smoke_hands",
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
          .setYRotDegrees(30)
          .setZRotDegrees(30)
          .animate("InOutCubic", progress);
      }
      if (builder.isFirstPerson()) {
        builder
          .get("right_arm")
          .setXRotDegrees(0)
          .setYRotDegrees(-30)
          .setZRotDegrees(-30)
          .animate("InOutCubic", progress);
      } else {
        // third person animations
        builder
          .get("left_arm")
          .setXRotDegrees(-90)
          .setYRotDegrees(0)
          .setZRotDegrees(0)
          .moveX(0)
          .moveY(0)
          .moveZ(0)
          .animate("InOutCubic", progress);
        builder
          .get("right_arm")
          .setXRotDegrees(-90)
          .setYRotDegrees(0)
          .setZRotDegrees(0)
          .moveX(0)
          .moveY(0)
          .moveZ(0)
          .animate("InOutCubic", progress);
        builder;
      }
    }
  });
  event.registerForPower("satsu_iron_man_addon/clap_smoke_hands.2",
      "satsu_iron_man_addon:iron_man/marks/mark_1873_nano/main", 10, (builder) => {
    // Gets the current animation timer progress from the ability, returned value is a number from 0.0 to 1.0
    const progress = animationUtil.getAnimationTimerAbilityValue(
      builder.getPlayer(),
      "satsu_iron_man_addon:iron_man/marks/mark_1873_nano/main",
      "mark.1873.clap_smoke_hands",
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
          .setXRotDegrees(-26)
          .setYRotDegrees(30)
          .setZRotDegrees(30)
          .animate("InOutCubic", progress);
      }
      if (builder.isFirstPerson()) {
        builder
          .get("right_arm")
          .setXRotDegrees(-26)
          .setYRotDegrees(-30)
          .setZRotDegrees(-30)
          .animate("InOutCubic", progress);
      } else {
        // third person animations
        builder
          .get("left_arm")
          .setXRotDegrees(-90)
          .setYRotDegrees(25)
          .setZRotDegrees(0)
          .moveX(0)
          .moveY(0)
          .moveZ(0)
          .animate("InOutCubic", progress);
        builder
          .get("right_arm")
          .setXRotDegrees(-90)
          .setYRotDegrees(-25)
          .setZRotDegrees(0)
          .moveX(0)
          .moveY(0)
          .moveZ(0)
          .animate("InOutCubic", progress);
        builder;
      }
    }
  });
});