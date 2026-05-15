// Register custom animations
PalladiumEvents.registerAnimations((event) => {
  event.registerForPower("satsu_iron_man_addon/marks/mark_extremis/main/hulkbuster",
      "satsu_iron_man_addon:iron_man/marks/mark_extremis/main", 10, (builder) => {
    // Gets the current animation timer progress from the ability, returned value is a number from 0.0 to 1.0
    const progress = animationUtil.getAnimationTimerAbilityValue(
      builder.getPlayer(),
      "satsu_iron_man_addon:iron_man/marks/mark_extremis/main",
      "hulkbuster",
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
          .get("left_arm")
          .moveX(2)
          .moveY(-5)
          .scaleX(2)
          .scaleY(1.5)
          .scaleZ(2)
          .animate("InOutCubic", progress);
        builder
          .get("right_arm")
          .moveX(-2)
          .moveY(-5)
          .scaleX(2)
          .scaleY(1.5)
          .scaleZ(2)
          .animate("InOutCubic", progress);
        builder
          .get("chest")
          .moveY(-6)
          .scaleX(1.5)
          .scaleY(1.5)
          .scaleZ(1.5)
          .animate("InOutCubic", progress);
        builder
          .get("head")
          .moveY(-5)
          .scaleX(1.4)
          .scaleY(1.2)
          .scaleZ(1.4)
          .animate("InOutCubic", progress);
        builder
          .get("left_leg")
          .moveX(1)
          .scaleX(1.5)
          .scaleZ(1.5)
          .animate("InOutCubic", progress);
        builder
          .get("right_leg")
          .moveX(-1)
          .scaleX(1.5)
          .scaleZ(1.5)
          .animate("InOutCubic", progress);
      }
    }
  });
});
