// Register custom animations
PalladiumEvents.registerAnimations((event) => {
  event.register(
    "satsu_iron_man_addon/colocacion.de.armadaura.mark_20",
    10,
    (builder) => {
      // Gets the current animation timer progress from the ability, returned value is a number from 0.0 to 1.0
      const progress = animationUtil.getAnimationTimerAbilityValue(
        builder.getPlayer(),
        "satsu_iron_man_addon:iron_man/marks/mark_20/main",
        "colocacion_de_armadura",
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
            .setXRotDegrees(0)
            .setYRotDegrees(0)
            .setZRotDegrees(-15)
            .moveX(0)
            .moveY(0)
            .moveZ(0)
            .animate("InOutCubic", progress);
          builder.get("chest").animate("InOutCubic", progress);
          builder
            .get("right_arm")
            .setXRotDegrees(0)
            .setYRotDegrees(0)
            .setZRotDegrees(15)
            .moveX(0)
            .moveY(0)
            .moveZ(0)
            .animate("InOutCubic", progress);
          builder.get("chest").animate("InOutCubic", progress);
          builder;
        }
      }
    }
  );
});
