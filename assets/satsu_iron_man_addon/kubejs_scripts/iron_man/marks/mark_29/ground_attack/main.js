// Register custom animations
PalladiumEvents.registerAnimations((event) => {
  event.registerForPower(
    "satsu_iron_man_addon/marks/mark_29/ground.attack.for.mark.with.hammer",
        "satsu_iron_man_addon:iron_man/marks/mark_29/main",
    10,
    (builder) => {
      // Gets the current animation timer progress from the ability, returned value is a number from 0.0 to 1.0
      const progress = animationUtil.getAnimationTimerAbilityValue(
        builder.getPlayer(),
        "satsu_iron_man_addon:iron_man/marks/mark_29/main",
        "ground_attack_for_mark_with_hammer",
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
            .setXRotDegrees(-126.2857)
            .setYRotDegrees(-14.2601)
            .setZRotDegrees(10.251)
            .moveX(0)
            .moveY(0)
            .moveZ(0)
            .animate("InOutCubic", progress);
          builder
            .get("right_arm")
            .setXRotDegrees(0)
            .setYRotDegrees(0)
            .setZRotDegrees(0)
            .moveX(0)
            .moveY(0)
            .moveZ(0)
            .animate("InOutCubic", progress);
          builder
            .get("head")
            .setXRotDegrees(0)
            .moveY(0)
            .moveZ(0)
            .animate("InOutCubic", progress);
          builder
            .get("chest")
            .moveY(0)
            .moveZ(0)
            .setXRotDegrees(0)
            .animate("InOutCubic", progress);
          builder
            .get("right_leg")
            .setXRotDegrees(0)
            .setYRotDegrees(0)
            .setZRotDegrees(0)
            .moveX(0)
            .moveY(0)
            .moveZ(0)
            .animate("InOutCubic", progress);
          builder
            .get("left_leg")
            .setXRotDegrees(0)
            .setYRotDegrees(0)
            .setZRotDegrees(0)
            .moveX(0)
            .moveY(0)
            .moveZ(0)
            .animate("InOutCubic", progress);
          builder;
        }
      }
    }
  );
  event.registerForPower(
    "satsu_iron_man_addon/marks/mark_29/ground.attack.for.mark.with.hammer.2",
        "satsu_iron_man_addon:iron_man/marks/mark_29/main",
    10,
    (builder) => {
      // Gets the current animation timer progress from the ability, returned value is a number from 0.0 to 1.0
      const progress = animationUtil.getAnimationTimerAbilityValue(
        builder.getPlayer(),
        "satsu_iron_man_addon:iron_man/marks/mark_29/main",
        "ground_attack_for_mark_with_hammer_2",
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
            .setXRotDegrees(-3.7857)
            .setYRotDegrees(14.2601)
            .setZRotDegrees(10.251)
            .moveX(0)
            .moveY(7.8785)
            .moveZ(-7)
            .animate("InOutCubic", progress);
          builder
            .get("right_arm")
            .setXRotDegrees(0)
            .setYRotDegrees(0)
            .setZRotDegrees(0)
            .moveX(0)
            .moveY(7.8785)
            .moveZ(-7)
            .animate("InOutCubic", progress);
          builder
            .get("head")
            .setXRotDegrees(10)
            .moveY(10.9693)
            .moveZ(-9.4488)
            .animate("InOutCubic", progress);
          builder
            .get("chest")
            .moveY(8.5061)
            .moveZ(-7.3876)
            .setXRotDegrees(62.5)
            .animate("InOutCubic", progress);
          builder
            .get("right_leg")
            .setXRotDegrees(-22.3265)
            .setYRotDegrees(2.8631)
            .setZRotDegrees(6.9349)
            .moveX(0)
            .moveY(1.9924)
            .moveZ(0.8257)
            .animate("InOutCubic", progress);
          builder
            .get("left_leg")
            .setXRotDegrees(28.493)
            .setYRotDegrees(-10.5453)
            .setZRotDegrees(-10.7286)
            .moveX(0)
            .moveY(1.7071)
            .moveZ(2.7071)
            .animate("InOutCubic", progress);
          builder;
        }
      }
    }
  );
});