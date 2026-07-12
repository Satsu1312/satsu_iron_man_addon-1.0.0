// Register custom animations
PalladiumEvents.registerAnimations((event) => {
  event.registerForPower("satsu_iron_man_addon/marks/model_50/shield_put_animation.hulkbuster", 
      "satsu_iron_man_addon:iron_man/marks/model_50/main",12, (builder) => {
    // Gets the current animation timer progress from the ability, returned value is a number from 0.0 to 1.0
    const progress = animationUtil.getAnimationTimerAbilityValue(
      builder.getPlayer(),
      "satsu_iron_man_addon:iron_man/marks/model_50/main",
      "shield_put_animation.hulkbuster",
      builder.getPartialTicks()
    );

    // only apply animation if progress is above 0!
    if (progress > 0.0) {
      const halfPi = 1.57079632679;

      // if first person
      if (builder.isFirstPerson()) {
        builder
          .get("left_arm")
          .setXRotDegrees(-80)
          .setYRotDegrees(0)
          .setZRotDegrees(100)
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
          .setXRotDegrees(-75.3081)
          .setYRotDegrees(-54.7918)
          .setZRotDegrees(-2.8087)
          .animate("InOutCubic", progress);
        builder
          .get("left_arm")
          .setXRotDegrees(-55)
          .setYRotDegrees(54.7918)
          .setZRotDegrees(-2.8087)
          .animate("InOutCubic", progress);
        builder;
      }
    }
  });
});