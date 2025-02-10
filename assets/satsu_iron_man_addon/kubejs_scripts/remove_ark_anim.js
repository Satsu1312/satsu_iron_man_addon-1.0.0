// Register custom animations
PalladiumEvents.registerAnimations((event) => {
  event.register("satsu_iron_man_addon/remove.ark.animation", 10, (builder) => {
    // Gets the current animation timer progress from the ability, returned value is a number from 0.0 to 1.0
    const progress = animationUtil.getAnimationTimerAbilityValue(
      builder.getPlayer(),
      "satsu_iron_man_addon:kube_animations",
      "remove_ark_animation_timer",
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
          .setXRotDegrees(0)
          .setYRotDegrees(0)
          .setZRotDegrees(0)
          .animate("InOutCubic", progress);
        builder.get("chest").animate("InOutCubic", progress);
        builder
          .get("right_arm")
          .setXRotDegrees(-135)
          .setYRotDegrees(0)
          .setZRotDegrees(90)
          .animate("InOutCubic", progress);
        builder.get("chest").animate("InOutCubic", progress);
      }
    }
  });
  event.register("satsu_iron_man_addon/remove.ark.animation.2", 10, (builder) => {
    // Gets the current animation timer progress from the ability, returned value is a number from 0.0 to 1.0
    const progress = animationUtil.getAnimationTimerAbilityValue(
      builder.getPlayer(),
      "satsu_iron_man_addon:kube_animations",
      "remove_ark_animation_timer.2",
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
          .setXRotDegrees(0)
          .setYRotDegrees(0)
          .setZRotDegrees(0)
          .animate("InOutCubic", progress);
        builder.get("chest").animate("InOutCubic", progress);
        builder
          .get("right_arm")
          .setXRotDegrees(-137.2658)
          .setYRotDegrees(-15.6999)
          .setZRotDegrees(106.3249)
          .animate("InOutCubic", progress);
        builder.get("chest").animate("InOutCubic", progress);
      }
    }
  });
});
