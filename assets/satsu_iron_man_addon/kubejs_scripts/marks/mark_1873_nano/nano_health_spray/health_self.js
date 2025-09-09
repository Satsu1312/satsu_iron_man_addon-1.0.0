PalladiumEvents.registerAnimations((event) => {
  event.register("satsu_iron_man_addon/marks/mark_1873_nano/nano_health_spray", 10, (builder) => {
    // Gets the current animation timer progress from the ability, returned value is a number from 0.0 to 1.0
    const progress = animationUtil.getAnimationTimerAbilityValue(
      builder.getPlayer(),
      "satsu_iron_man_addon:marks/mark_1873_nano/main",
      "nano_health_spray",
      builder.getPartialTicks(),
    );

    // only apply animation if progress is above 0!
    if (progress > 0.0) {
      const halfPi = 1.57079632679;

      // if first person
      if (builder.isFirstPerson()) {
        builder
          .get("right_arm")
          .setXRotDegrees(-50)
          .setYRotDegrees(0)
          .setZRotDegrees(8)
          .animate("InOutCubic", progress);
      } else {
        // third person animations
        builder
          .get("right_arm")
          .setXRotDegrees(-44.8121)
          .setYRotDegrees(-45.1866)
          .setZRotDegrees(-35.5296)
          .animate("InOutCubic", progress);
        builder;
      }
    }
  });
});
