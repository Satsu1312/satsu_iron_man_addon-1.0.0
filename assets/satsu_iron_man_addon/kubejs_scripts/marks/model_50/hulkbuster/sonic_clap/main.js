// Register custom animations
PalladiumEvents.registerAnimations((event) => {
  event.register("satsu_iron_man_addon/marks/model_50/sonic_clap1", 10, (builder) => {
    // Gets the current animation timer progress from the ability, returned value is a number from 0.0 to 1.0
    const progress = animationUtil.getAnimationTimerAbilityValue(
      builder.getPlayer(),
      "satsu_iron_man_addon:marks/model_50/hulkbuster/main",
      "sonic_clap",
      builder.getPartialTicks(),
      0,
      2
    );
    // only apply animation if progress is above 0!
    if (progress > 0.0) {
      const halfPi = 1.57079632679;

      // if first person
      if (builder.isFirstPerson()) {
        builder
          .get("right_arm")
          .setXRotDegrees(0)
          .setYRotDegrees(-30)
          .setZRotDegrees(-30)
          .animate("InOutCubic", progress);
        builder
          .get("left_arm")
          .setXRotDegrees(0)
          .setYRotDegrees(30)
          .setZRotDegrees(30)
          .animate("InOutCubic", progress);
      }
      //if third person
      if (!builder.isFirstPerson()) {
        builder
          .get("right_arm")
          .setXRotDegrees(-90)
          .setYRotDegrees(0)
          .setZRotDegrees(0)
          .animate("InOutCubic", progress);
        builder
          .get("left_arm")
          .setXRotDegrees(-90)
          .setYRotDegrees(0)
          .setZRotDegrees(0)
          .animate("InOutCubic", progress);
      }
    }
  });
  event.register("satsu_iron_man_addon/marks/model_50/sonic_clap2", 10, (builder) => {
    // Gets the current animation timer progress from the ability, returned value is a number from 0.0 to 1.0
    const progress = animationUtil.getAnimationTimerAbilityValue(
      builder.getPlayer(),
      "satsu_iron_man_addon:marks/model_50/hulkbuster/main",
      "sonic_clap",
      builder.getPartialTicks(),
      3,
      6
    );
    // only apply animation if progress is above 0!
    if (progress > 0.0) {
      const halfPi = 1.57079632679;

      // if first person
      if (builder.isFirstPerson()) {
        builder
          .get("right_arm")
          .setXRotDegrees(-33)
          .setYRotDegrees(-30)
          .setZRotDegrees(-30)
          .animate("InOutCubic", progress);
        builder
          .get("left_arm")
          .setXRotDegrees(-33)
          .setYRotDegrees(30)
          .setZRotDegrees(30)
          .animate("InOutCubic", progress);
      }
      //if third person
      if (!builder.isFirstPerson()) {
        builder
          .get("right_arm")
          .setXRotDegrees(-90)
          .setYRotDegrees(-23)
          .setZRotDegrees(0)
          .animate("InOutCubic", progress);
        builder
          .get("left_arm")
          .setXRotDegrees(-90)
          .setYRotDegrees(23)
          .setZRotDegrees(0)
          .animate("InOutCubic", progress);
      }
    }
  });
});
