// Register custom animations
PalladiumEvents.registerAnimations((event) => {
  event.registerForPower(
    "satsu_iron_man_addon/fast_fly_left_arm",
    "satsu_iron_man_addon:kube_animations",
    10,
    (builder) => {
      // Gets the current animation timer progress from the ability, returned value is a number from 0.0 to 1.0
      const progress = animationUtil.getAnimationTimerAbilityValue(
        builder.getPlayer(),
        "satsu_iron_man_addon:kube_animations",
        "flight_animation_fast",
        builder.getPartialTicks()
      );

      // only apply animation if progress is above 0!
      if (
        progress > 0 &&
        !builder.isFirstPerson() &&
        !builder.getPlayer().isSwimming()
      )
        if (progress > 0.0) {
          const halfPi = 1.57079632679;
          {
            // third person animations
            builder
              .get("left_arm")
              .setXRotDegrees(0)
              .setZRotDegrees(-20)
              .animate("InOutCubic", progress);
            builder.get("chest").animate("InOutCubic", progress);
            builder
              .get("right_arm")
              .setXRotDegrees(0)
              .setZRotDegrees(20)
              .animate("InOutCubic", progress);
            builder.get("chest").animate("InOutCubic", progress);
          }
        }
    }
  );
});
