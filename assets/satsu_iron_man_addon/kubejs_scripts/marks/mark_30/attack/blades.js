PalladiumEvents.registerAnimations((event) => {
  event.register("satsu_iron_man_addon/marks/mark_30/blade_attack", 10, (builder) => {
    // Gets the current animation timer progress from the ability, returned value is a number from 0.0 to 1.0
    const progress = animationUtil.getAnimationTimerAbilityValue(
      builder.getPlayer(),
      "satsu_iron_man_addon:marks/mark_30/main",
      "vibranuim.blades.attack",
      builder.getPartialTicks(),
      0,
      6
    );

    // only apply animation if progress is above 0!
    if (
      palladium.abilities.isEnabled(
        builder.getPlayer(),
        "satsu_iron_man_addon:marks/mark_30/main",
        "vibranuim.blades.attack"
      )
    )
    if (progress > 0.0) {
      const halfPi = 1.57079632679;

      // if first person
      if (builder.isFirstPerson()) {
        builder
          .get("left_arm")
          .setXRotDegrees(-50)
          .setYRotDegrees(0)
          .setZRotDegrees(-8)
          .animate("InOutCubic", progress);
      }
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
          .get("left_arm")
          .setXRotDegrees(-180)
          .setYRotDegrees(0)
          .setZRotDegrees(15)
          .moveX(0)
          .moveY(0)
          .moveZ(0)
          .animate("InOutCubic", progress);
        builder
          .get("right_arm")
          .setXRotDegrees(-179.7055)
          .setYRotDegrees(-0.4272)
          .setZRotDegrees(-15.0555)
          .moveX(0)
          .moveY(0)
          .moveZ(0)
          .animate("InOutCubic", progress);
        builder;
      }
    }
  });
  event.register("satsu_iron_man_addon/marks/mark_30/blade_attack_2", 10, (builder) => {
    // Gets the current animation timer progress from the ability, returned value is a number from 0.0 to 1.0
    const progress = animationUtil.getAnimationTimerAbilityValue(
      builder.getPlayer(),
      "satsu_iron_man_addon:marks/mark_30/main",
      "vibranuim.blades.attack",
      builder.getPartialTicks(),
      6,
      15
    );

    // only apply animation if progress is above 0!
    if (
      palladium.abilities.isEnabled(
        builder.getPlayer(),
        "satsu_iron_man_addon:marks/mark_30/main",
        "vibranuim.blades.attack"
      )
    )
    if (progress > 0.0) {
      const halfPi = 1.57079632679;

      // if first person
      if (builder.isFirstPerson()) {
        builder
          .get("left_arm")
          .setXRotDegrees(-15)
          .setYRotDegrees(0)
          .setZRotDegrees(-2)
          .animate("InOutCubic", progress);
      }
      if (builder.isFirstPerson()) {
        builder
          .get("right_arm")
          .setXRotDegrees(-15)
          .setYRotDegrees(0)
          .setZRotDegrees(2)
          .animate("InOutCubic", progress);
      } else {
        // third person animations
        builder
          .get("left_arm")
          .setXRotDegrees(-49.5675)
          .setYRotDegrees(7.6443)
          .setZRotDegrees(21.4664)
          .moveX(0)
          .moveY(0)
          .moveZ(0)
          .animate("InOutCubic", progress);
        builder
          .get("right_arm")
          .setXRotDegrees(-49.241)
          .setYRotDegrees(-8.05)
          .setZRotDegrees(-19.0654)
          .moveX(0)
          .moveY(0)
          .moveZ(0)
          .animate("InOutCubic", progress);
        builder;
      }
    }
  });
});
