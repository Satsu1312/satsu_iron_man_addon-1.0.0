// Register custom animations
PalladiumEvents.registerAnimations((event) => {
  event.registerForPower(
    "satsu_iron_man_addon/iron_man/animation_falling",
    "satsu_iron_man_addon:iron_man/marks/mecano_calll",
    10,
    (builder) => {
      // Gets the current animation timer progress from the ability, returned value is a number from 0.0 to 1.0
      const progress = animationUtil.getAnimationTimerAbilityValue(
        builder.getPlayer(),
        "satsu_iron_man_addon:iron_man/marks/mecano_calll",
        "animation_falling",
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
            .setYRotDegrees(0)
            .setZRotDegrees(0)
            .animate("InOutCubic", progress);
        } else {
          // third person animations
          builder
            .get("body")
            .setXRotDegrees(-90)
            .setZ(20)
            .animate("InOutCubic", progress);
          builder
            .get("left_arm")
            .setXRotDegrees(22.5)
            .setYRotDegrees(0)
            .setZRotDegrees(-30)
            .animate("InOutCubic", progress);
          builder
            .get("right_arm")
            .setXRotDegrees(22.5)
            .setYRotDegrees(0)
            .setZRotDegrees(30)
            .animate("InOutCubic", progress);
          builder
            .get("right_leg")
            .setXRotDegrees(22.5)
            .setYRotDegrees(0)
            .setZRotDegrees(10)
            .animate("InOutCubic", progress);
          builder
            .get("left_leg")
            .setXRotDegrees(22.5)
            .setYRotDegrees(0)
            .setZRotDegrees(-10)
            .animate("InOutCubic", progress);
          builder;
        }
      }
    }
  );
});
