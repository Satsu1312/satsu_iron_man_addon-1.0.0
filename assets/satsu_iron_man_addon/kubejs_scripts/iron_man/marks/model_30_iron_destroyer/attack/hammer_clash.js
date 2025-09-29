PalladiumEvents.registerAnimations((event) => {
  event.register("satsu_iron_man_addon/marks/model_30_iron_destroyer/mallet_smash.1", 10, (builder) => {
    // Gets the current animation timer progress from the ability, returned value is a number from 0.0 to 1.0
    const progress = animationUtil.getAnimationTimerAbilityValue(
      builder.getPlayer(),
      "satsu_iron_man_addon:iron_man/marks/model_30_iron_destroyer/main",
      "nano_mallet.smash",
      builder.getPartialTicks(),
      0,
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
            .setYRotDegrees(20)
            .setZRotDegrees(20)
            .animate("InOutCubic", progress);
        }
        if (builder.isFirstPerson()) {
          builder
            .get("right_arm")
            .setXRotDegrees(0)
            .setYRotDegrees(-20)
            .setZRotDegrees(-20)
            .animate("InOutCubic", progress);
        } else {
          // third person animations
          builder
            .get("left_arm")
            .setXRotDegrees(0)
            .setYRotDegrees(0)
            .setZRotDegrees(-90)
            .moveX(0)
            .moveY(0)
            .moveZ(0)
            .animate("InOutCubic", progress);
          builder
            .get("right_arm")
            .setXRotDegrees(0)
            .setYRotDegrees(0)
            .setZRotDegrees(90)
            .moveX(0)
            .moveY(0)
            .moveZ(0)
            .animate("InOutCubic", progress);
          builder;
        }
      }
  });
  event.register("satsu_iron_man_addon/marks/model_30_iron_destroyer/mallet_smash.2", 10, (builder) => {
    // Gets the current animation timer progress from the ability, returned value is a number from 0.0 to 1.0
    const progress = animationUtil.getAnimationTimerAbilityValue(
      builder.getPlayer(),
      "satsu_iron_man_addon:iron_man/marks/model_30_iron_destroyer/main",
      "nano_mallet.smash",
      builder.getPartialTicks(),
      6,
      15
    );

    // only apply animation if progress is above 0!
      if (progress > 0.0) {
        const halfPi = 1.57079632679;
        // if first person
        if (builder.isFirstPerson()) {
          builder
            .get("left_arm")
            .setXRotDegrees(-23)
            .setYRotDegrees(15)
            .setZRotDegrees(15)
            .animate("InOutCubic", progress);
        }
        if (builder.isFirstPerson()) {
          builder
            .get("right_arm")
            .setXRotDegrees(-25)
            .setYRotDegrees(-15)
            .setZRotDegrees(-15)
            .animate("InOutCubic", progress);
        } else {
          // third person animations
          builder
            .get("left_arm")
            .setXRotDegrees(-62.5)
            .setYRotDegrees(0)
            .setZRotDegrees(-90)
            .moveX(0)
            .moveY(0)
            .moveZ(0)
            .animate("InOutCubic", progress);
          builder
            .get("right_arm")
            .setXRotDegrees(-62.5)
            .setYRotDegrees(0)
            .setZRotDegrees(90)
            .moveX(0)
            .moveY(0)
            .moveZ(0)
            .animate("InOutCubic", progress);
          builder;
        }
      }
  });
});
