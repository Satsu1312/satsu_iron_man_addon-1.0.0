// Register custom animations
PalladiumEvents.registerAnimations((event) => {
  event.register("satsu_iron_man_addon/personalization_mode", 10, (builder) => {
    // Gets the current animation timer progress from the ability, returned value is a number from 0.0 to 1.0
    const progress = animationUtil.getAnimationTimerAbilityValue(
      builder.getPlayer(),
      "satsu_iron_man_addon:kube_animations",
      "omnitrix_main_arms_aim_one",
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
          .setYRotDegrees(30)
          .setZRotDegrees(30)
          .animate("InOutCubic", progress);
      }
      if (builder.isFirstPerson()) {
        builder
          .get("right_arm")
          .setXRotDegrees(-60)
          .setYRotDegrees(-30)
          .setZRotDegrees(-30)
          .animate("InOutCubic", progress);
      } else {
        // third person animations
        builder
          .get("left_arm")
          .setXRotDegrees(-112.7518)
          .setYRotDegrees(35.5821)
          .setZRotDegrees(-76.6749)
          .animate("InOutCubic", progress);
        builder.get("chest").animate("InOutCubic", progress);
        builder
          .get("right_arm")
          .setXRotDegrees(-85)
          .setYRotDegrees(-37.5)
          .setZRotDegrees(0)
          .animate("InOutCubic", progress);
        builder.get("chest").animate("InOutCubic", progress);
      }
    }
  });
});
