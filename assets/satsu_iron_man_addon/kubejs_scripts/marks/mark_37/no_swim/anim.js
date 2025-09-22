// Register custom animations
PalladiumEvents.registerAnimations((event) => {
  event.register(
    "satsu_iron_man_addon/no_swim_mark_animation.mark.37",
    10,
    (builder) => {
      // Gets the current animation timer progress from the ability, returned value is a number from 0.0 to 1.0
      const progress = animationUtil.getAnimationTimerAbilityValue(
        builder.getPlayer(),
        "satsu_iron_man_addon:iron_man/marks/mark_37/main",
        "no_swim_mark_animation",
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
            .get("right_arm")
            .setXRotDegrees(12.3265)
            .setYRotDegrees(-2.8631)
            .setZRotDegrees(6.9349)
            .animate("InOutCubic", progress);
          builder
            .get("left_arm")
            .setXRotDegrees(12.3265)
            .setYRotDegrees(2.8631)
            .setZRotDegrees(-6.9349)
            .animate("InOutCubic", progress);
          builder
            .get("right_leg")
            .setXRotDegrees(0)
            .setYRotDegrees(0)
            .animate("InOutCubic", progress);
          builder
            .get("left_leg")
            .setXRotDegrees(0)
            .setYRotDegrees(0)
            .animate("InOutCubic", progress);
          builder
            .get("body")
            .setXRotDegrees(0)
            .setYRotDegrees(0)
            .setZRotDegrees(0)
            .animate("InOutCubic", progress);
          builder;
        }
      }
    }
  );
  event.register(
    "satsu_iron_man_addon/movement_underwater_skill.mark.37",
    10,
    (builder) => {
      // Gets the current animation timer progress from the ability, returned value is a number from 0.0 to 1.0
      const progress = animationUtil.getAnimationTimerAbilityValue(
        builder.getPlayer(),
        "satsu_iron_man_addon:iron_man/marks/mark_37/main",
        "movement_underwater_skill",
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
            .get("right_arm")
            .setXRotDegrees(22.3265)
            .setYRotDegrees(-2.8631)
            .setZRotDegrees(6.9349)
            .animate("InOutCubic", progress);
          builder
            .get("left_arm")
            .setXRotDegrees(22.3265)
            .setYRotDegrees(2.8631)
            .setZRotDegrees(-6.9349)
            .animate("InOutCubic", progress);
          builder
            .get("right_leg")
            .setXRotDegrees(25)
            .setYRotDegrees(0)
            .animate("InOutCubic", progress);
          builder
            .get("left_leg")
            .setXRotDegrees(25)
            .setYRotDegrees(0)
            .animate("InOutCubic", progress);
          builder;
        }
      }
    }
  );
});
