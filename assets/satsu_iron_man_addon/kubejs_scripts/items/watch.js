PalladiumEvents.registerAnimations((event) => {
  event.register("satsu_iron_man_addon/watch_glove/anim_1", 1, (builder) => {
    let progress = animationUtil.getAnimationTimerAbilityValue(
      builder.getPlayer(),
      "satsu_iron_man_addon:watch",
      "glove_animation_1",
      builder.getPartialTicks(),
    );
    if (progress > 0.0) {
      const halfPi = 1.57079632679;

      // if first person
      if (builder.isFirstPerson()) {
        builder
          .get("left_arm")
          .setXRotDegrees(-40)
          .setYRotDegrees(45)
          .setZRotDegrees(0)
          .animate("InOutCubic", progress);
      }
      if (builder.isFirstPerson()) {
        builder
          .get("right_arm")
          .setXRotDegrees(-20)
          .setYRotDegrees(-30)
          .setZRotDegrees(-45)
          .animate("InOutCubic", progress);
      } else {
        // third person animations
        builder
          .get("left_arm")
          .setXRotDegrees(-90)
          .setYRotDegrees(57.5)
          .setZRotDegrees(0)
          .animate("InOutCubic", progress);
        builder.get("chest").animate("InOutCubic", progress);
        builder
          .get("right_arm")
          .setXRotDegrees(-59.2124)
          .setYRotDegrees(-22.2249)
          .setZRotDegrees(-16.6248)
          .animate("InOutCubic", progress);
        builder.get("chest").animate("InOutCubic", progress);
        builder;
      }
    }
  });
  event.register("satsu_iron_man_addon/watch_glove/anim_2", 1, (builder) => {
    let progress = animationUtil.getAnimationTimerAbilityValue(
      builder.getPlayer(),
      "satsu_iron_man_addon:watch",
      "glove_animation_2",
      builder.getPartialTicks(),
    );
    if (progress > 0.0) {
      const halfPi = 1.57079632679;

      // if first person
      if (builder.isFirstPerson()) {
        builder
          .get("left_arm")
          .setXRotDegrees(-40)
          .setYRotDegrees(80)
          .setZRotDegrees(0)
          .animate("InOutCubic", progress);
      }
      if (builder.isFirstPerson()) {
        builder
          .get("right_arm")
          .setXRotDegrees(-20)
          .setYRotDegrees(-30)
          .setZRotDegrees(-45)
          .animate("InOutCubic", progress);
      } else {
        // third person animations
        builder
          .get("left_arm")
          .setXRotDegrees(-90)
          .setYRotDegrees(27.5)
          .setZRotDegrees(0)
          .animate("InOutCubic", progress);
        builder.get("chest").animate("InOutCubic", progress);
        builder
          .get("right_arm")
          .setXRotDegrees(-59.2124)
          .setYRotDegrees(-22.2249)
          .setZRotDegrees(-16.6248)
          .animate("InOutCubic", progress);
        builder.get("chest").animate("InOutCubic", progress);
        builder;
      }
    }
  });
});
