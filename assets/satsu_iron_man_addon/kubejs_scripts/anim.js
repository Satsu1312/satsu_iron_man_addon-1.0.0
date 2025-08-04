// Register custom animations
PalladiumEvents.registerAnimations((event) => {
  event.register("satsu_iron_man_addon/personalization_mode", 10, (builder) => {
    // Gets the current animation timer progress from the ability, returned value is a number from 0.0 to 1.0
    const progress = animationUtil.getAnimationTimerAbilityValue(
      builder.getPlayer(),
      "satsu_iron_man_addon:kube_animations",
      "personalization",
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
PalladiumEvents.registerAnimations((event) => {
  event.register(
    "satsu_iron_man_addon/personalization_mode_armor",
    10,
    (builder) => {
      // Gets the current animation timer progress from the ability, returned value is a number from 0.0 to 1.0
      const progress = animationUtil.getAnimationTimerAbilityValue(
        builder.getPlayer(),
        "satsu_iron_man_addon:kube_animations",
        "personalization_armor",
        builder.getPartialTicks()
      );

      // only apply animation if progress is above 0!
      if (progress > 0.0) {
        const halfPi = 1.57079632679;

        // if first person
        if (builder.isFirstPerson()) {
          builder
            .get("left_arm")
            .setXRotDegrees(-20)
            .setYRotDegrees(-60)
            .setZRotDegrees(60)
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
            .setXRotDegrees(-55.3472)
            .setYRotDegrees(24.2545)
            .setZRotDegrees(18.3835)
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
    }
  );
});
PalladiumEvents.registerAnimations((event) => {
  event.register("satsu_iron_man_addon/im_superior", 10, (builder) => {
    // Gets the current animation timer progress from the ability, returned value is a number from 0.0 to 1.0
    const progress = animationUtil.getAnimationTimerAbilityValue(
      builder.getPlayer(),
      "satsu_iron_man_addon:kube_animations",
      "im_superior",
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
          .setXRotDegrees(-75.2219)
          .setYRotDegrees(36.3885)
          .setZRotDegrees(-3.0067)
          .animate("InOutCubic", progress);
        builder.get("chest").animate("InOutCubic", progress);
        builder
          .get("right_arm")
          .setXRotDegrees(-75.2219)
          .setYRotDegrees(-36.3885)
          .setZRotDegrees(-3.0067)
          .animate("InOutCubic", progress);
        builder.get("chest").animate("InOutCubic", progress);
        builder
          .get("left_leg")
          .setXRotDegrees(-45)
          .animate("InOutCubic", progress);
        builder.get("chest").animate("InOutCubic", progress);
        builder
          .get("right_leg")
          .setXRotDegrees(-66.8516)
          .setYRotDegrees(-10.2124)
          .setZRotDegrees(-7.2468)
          .animate("InOutCubic", progress);
        builder.get("chest").animate("InOutCubic", progress);
        builder
          .get("chest")
          .setXRotDegrees(0)
          .setYRotDegrees(0)
          .setZRotDegrees(0)
          .animate("InOutCubic", progress);
        builder.get("chest").animate("InOutCubic", progress);
        builder
          .get("body")
          .setXRotDegrees(0)
          .setYRotDegrees(0)
          .setZRotDegrees(0)
          .animate("InOutCubic", progress);
        builder.get("chest").animate("InOutCubic", progress);
      }
    }
  });
});
PalladiumEvents.registerAnimations((event) => {
  event.register("satsu_iron_man_addon/ark_recharge", 10, (builder) => {
    // Gets the current animation timer progress from the ability, returned value is a number from 0.0 to 1.0
    const progress = animationUtil.getAnimationTimerAbilityValue(
      builder.getPlayer(),
      "satsu_iron_man_addon:kube_animations",
      "test",
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
          .setXRotDegrees(50)
          .moveX(0)
          .moveY(0)
          .moveZ(0)
          .animate("InOutCubic", progress);
        builder
          .get("right_arm")
          .setXRotDegrees(-15)
          .moveX(0)
          .moveY(0)
          .moveZ(-4)
          .animate("InOutCubic", progress);
        builder
          .get("left_leg")
          .setXRotDegrees(22.5)
          .moveY(-1)
          .animate("InOutCubic", progress);
        builder.get("right_leg").moveY(-1).animate("InOutCubic", progress);
        builder
          .get("body")
          .setXRotDegrees(-22.5)
          .moveX(0)
          .moveY(-2)
          .moveZ(-4)
          .animate("InOutCubic", progress);
        builder
          .get("head")
          .setXRotDegrees(22.5)
          .animate("InOutCubic", progress);
      }
    }
  });
});
PalladiumEvents.registerAnimations((event) => {
  event.register("satsu_iron_man_addon/ark_decharge.1", 10, (builder) => {
    // Gets the current animation timer progress from the ability, returned value is a number from 0.0 to 1.0
    const progress = animationUtil.getAnimationTimerAbilityValue(
      builder.getPlayer(),
      "satsu_iron_man_addon:kube_animations",
      "ark_decharge.1",
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
          .setXRotDegrees(-90)
          .setYRotDegrees(52.5)
          .animate("InOutCubic", progress);
        builder
          .get("right_arm")
          .setXRotDegrees(-90)
          .setYRotDegrees(-52.5)
          .animate("InOutCubic", progress);
        builder;
      }
    }
  });
});
PalladiumEvents.registerAnimations((event) => {
  event.register(
    "satsu_iron_man_addon/iron.man.pose.fall.flying",
    10,
    (builder) => {
      // Gets the current animation timer progress from the ability, returned value is a number from 0.0 to 1.0
      const progress = animationUtil.getAnimationTimerAbilityValue(
        builder.getPlayer(),
        "satsu_iron_man_addon:kube_animations",
        "fall_flying",
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
            .setXRotDegrees(49)
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
            .moveX(0)
            .moveY(7.8785)
            .moveZ(-7)
            .scaleY(1.3)
            .animate("InOutCubic", progress);
          builder
            .get("right_arm")
            .setXRotDegrees(0)
            .setYRotDegrees(0)
            .setZRotDegrees(80)
            .moveX(1.3892)
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
PalladiumEvents.registerAnimations((event) => {
  event.register("satsu_iron_man_addon/ark_decharge.2", 10, (builder) => {
    // Gets the current animation timer progress from the ability, returned value is a number from 0.0 to 1.0
    const progress = animationUtil.getAnimationTimerAbilityValue(
      builder.getPlayer(),
      "satsu_iron_man_addon:kube_animations",
      "ark_decharge.2",
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
          .setXRotDegrees(-90)
          .setYRotDegrees(-70)
          .animate("InOutCubic", progress);
        builder
          .get("right_arm")
          .setXRotDegrees(-90)
          .setYRotDegrees(70)
          .animate("InOutCubic", progress);
        builder;
      }
    }
  });
});
PalladiumEvents.registerAnimations((event) => {
  event.register(
    "satsu_iron_man_addon/colocacion_de_armadura.1",
    10,
    (builder) => {
      // Gets the current animation timer progress from the ability, returned value is a number from 0.0 to 1.0
      const progress = animationUtil.getAnimationTimerAbilityValue(
        builder.getPlayer(),
        "satsu_iron_man_addon:kube_animations",
        "colocacion_de_armadura.1",
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
            .setZRotDegrees(-90)
            .animate("InOutCubic", progress);
          builder
            .get("right_arm")
            .setXRotDegrees(0)
            .setYRotDegrees(0)
            .setZRotDegrees(90)
            .animate("InOutCubic", progress);
          builder;
        }
      }
    }
  );
});
PalladiumEvents.registerAnimations((event) => {
  event.register(
    "satsu_iron_man_addon/colocacion_de_armadura.2.iron.man.pose",
    10,
    (builder) => {
      // Gets the current animation timer progress from the ability, returned value is a number from 0.0 to 1.0
      const progress = animationUtil.getAnimationTimerAbilityValue(
        builder.getPlayer(),
        "satsu_iron_man_addon:kube_animations",
        "test.1",
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
            .setXRotDegrees(49)
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
            .moveX(0)
            .moveY(7.8785)
            .moveZ(-7)
            .scaleY(1.3)
            .animate("InOutCubic", progress);
          builder
            .get("right_arm")
            .setXRotDegrees(0)
            .setYRotDegrees(0)
            .setZRotDegrees(80)
            .moveX(1.3892)
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
PalladiumEvents.registerAnimations((event) => {
  event.register(
    "satsu_iron_man_addon/colocacion_de_armadura.3.iron.man.standar.pose",
    10,
    (builder) => {
      // Gets the current animation timer progress from the ability, returned value is a number from 0.0 to 1.0
      const progress = animationUtil.getAnimationTimerAbilityValue(
        builder.getPlayer(),
        "satsu_iron_man_addon:kube_animations",
        "test",
        builder.getPartialTicks()
      );

      // only apply animation if progress is above 0!
      if (progress > 0.0) {
        const halfPi = 1.57079632679;

        // if first person
        if (builder.isFirstPerson()) {
          builder
            .get("left_arm")
            .setXRotDegrees(49)
            .setYRotDegrees(-30)
            .setZRotDegrees(30)
            .animate("InOutCubic", progress);
        }
        if (builder.isFirstPerson()) {
          builder
            .get("right_arm")
            .setXRotDegrees(49)
            .setYRotDegrees(-30)
            .setZRotDegrees(-30)
            .animate("InOutCubic", progress);
        } else {
          // third person animations
          builder
            .get("left_arm")
            .setXRotDegrees(90)
            .setYRotDegrees(-65)
            .setZRotDegrees(-180)
            .moveX(0)
            .moveY(0)
            .moveZ(0)
            .animate("InOutCubic", progress);
          builder.get("chest").animate("InOutCubic", progress);
          builder
            .get("right_arm")
            .setXRotDegrees(90)
            .setYRotDegrees(65)
            .setZRotDegrees(180)
            .moveX(0)
            .moveY(0)
            .moveZ(0)
            .animate("InOutCubic", progress);
          builder.get("chest").animate("InOutCubic", progress);
          builder
            .get("head")
            .setXRotDegrees(-12.5)
            .animate("InOutCubic", progress);
          builder.get("chest").animate("InOutCubic", progress);
          builder;
        }
      }
    }
  );
});
PalladiumEvents.registerAnimations((event) => {
  event.register(
    "satsu_iron_man_addon/colocacion_de_armadura.every.hand.extended.iron.man.standar.pose",
    10,
    (builder) => {
      // Gets the current animation timer progress from the ability, returned value is a number from 0.0 to 1.0
      const progress = animationUtil.getAnimationTimerAbilityValue(
        builder.getPlayer(),
        "satsu_iron_man_addon:kube_animations",
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
          builder
            .get("head")
            .setXRotDegrees(-5)
            .animate("InOutCubic", progress);
          builder.get("chest").animate("InOutCubic", progress);
          builder;
        }
      }
    }
  );
});
PalladiumEvents.registerAnimations((event) => {
  event.register(
    "satsu_iron_man_addon/colocacion_de_armadura.4.iron.man.standar.pose",
    10,
    (builder) => {
      // Gets the current animation timer progress from the ability, returned value is a number from 0.0 to 1.0
      const progress = animationUtil.getAnimationTimerAbilityValue(
        builder.getPlayer(),
        "satsu_iron_man_addon:kube_animations",
        "test.4",
        builder.getPartialTicks()
      );

      // only apply animation if progress is above 0!
      if (progress > 0.0) {
        const halfPi = 1.57079632679;

        // if first person
        if (builder.isFirstPerson()) {
          builder
            .get("left_arm")
            .setXRotDegrees(49)
            .setYRotDegrees(-30)
            .setZRotDegrees(30)
            .animate("InOutCubic", progress);
        }
        if (builder.isFirstPerson()) {
          builder
            .get("right_arm")
            .setXRotDegrees(49)
            .setYRotDegrees(-30)
            .setZRotDegrees(-30)
            .animate("InOutCubic", progress);
        } else {
          // third person animations
          builder
            .get("left_arm")
            .setXRotDegrees(0)
            .setYRotDegrees(0)
            .setZRotDegrees(-22.5)
            .moveX(0)
            .moveY(0)
            .moveZ(0)
            .animate("InOutCubic", progress);
          builder.get("chest").animate("InOutCubic", progress);
          builder
            .get("right_arm")
            .setXRotDegrees(0)
            .setYRotDegrees(0)
            .setZRotDegrees(22.5)
            .moveX(0)
            .moveY(0)
            .moveZ(0)
            .animate("InOutCubic", progress);
          builder.get("chest").animate("InOutCubic", progress);
          builder
            .get("head")
            .setXRotDegrees(-5)
            .animate("InOutCubic", progress);
          builder.get("chest").animate("InOutCubic", progress);
          builder;
        }
      }
    }
  );
});
PalladiumEvents.registerAnimations((event) => {
  event.register(
    "satsu_iron_man_addon/colocacion_de_armadura.5.superior.iron.man.pose",
    10,
    (builder) => {
      // Gets the current animation timer progress from the ability, returned value is a number from 0.0 to 1.0
      const progress = animationUtil.getAnimationTimerAbilityValue(
        builder.getPlayer(),
        "satsu_iron_man_addon:marks/model_50/main",
        "superior_activaded_anim",
        builder.getPartialTicks()
      );

      // only apply animation if progress is above 0!
      if (progress > 0.0) {
        const halfPi = 1.57079632679;

        // if first person
        if (builder.isFirstPerson()) {
          builder
            .get("left_arm")
            .setXRotDegrees(90)
            .setYRotDegrees(0)
            .setZRotDegrees(0)
            .animate("InOutCubic", progress);
        }
        if (builder.isFirstPerson()) {
          builder
            .get("right_arm")
            .setXRotDegrees(80)
            .setYRotDegrees(-30)
            .setZRotDegrees(-30)
            .animate("InOutCubic", progress);
        } else {
          // third person animations
          builder
            .get("left_arm")
            .setXRotDegrees(-97.5)
            .setYRotDegrees(-85)
            .setZRotDegrees(0)
            .moveX(0)
            .moveY(0)
            .moveZ(0)
            .animate("InOutCubic", progress);
          builder.get("chest").animate("InOutCubic", progress);
          builder
            .get("right_arm")
            .setXRotDegrees(-97.5)
            .setYRotDegrees(85)
            .setZRotDegrees(0)
            .moveX(0)
            .moveY(0)
            .moveZ(0)
            .animate("InOutCubic", progress);
          builder.get("chest").animate("InOutCubic", progress);
          builder
            .get("head")
            .setXRotDegrees(-12.5)
            .animate("InOutCubic", progress);
          builder.get("chest").animate("InOutCubic", progress);
          builder;
        }
      }
    }
  );
});
PalladiumEvents.registerAnimations((event) => {
  event.register(
    "satsu_iron_man_addon/colocacion_de_armadura.6.blooded.mark.pose",
    10,
    (builder) => {
      // Gets the current animation timer progress from the ability, returned value is a number from 0.0 to 1.0
      const progress = animationUtil.getAnimationTimerAbilityValue(
        builder.getPlayer(),
        "satsu_iron_man_addon:kube_animations",
        "blooded_activaded_anim",
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
            .setXRotDegrees(0)
            .setYRotDegrees(-30)
            .setZRotDegrees(-30)
            .animate("InOutCubic", progress);
        } else {
          // third person animations
          builder
            .get("left_arm")
            .setXRotDegrees(-90)
            .setYRotDegrees(0)
            .setZRotDegrees(0)
            .moveX(0)
            .moveY(0)
            .moveZ(0)
            .animate("InOutCubic", progress);
          builder.get("chest").animate("InOutCubic", progress);
          builder
            .get("right_arm")
            .setXRotDegrees(-90)
            .setYRotDegrees(-0)
            .setZRotDegrees(-0)
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
  event.register(
    "satsu_iron_man_addon/colocacion_de_armadura.6.blooded.mark.pose.2",
    10,
    (builder) => {
      // Gets the current animation timer progress from the ability, returned value is a number from 0.0 to 1.0
      const progress = animationUtil.getAnimationTimerAbilityValue(
        builder.getPlayer(),
        "satsu_iron_man_addon:kube_animations",
        "blooded_activaded_anim.2",
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
            .setXRotDegrees(0)
            .setYRotDegrees(-30)
            .setZRotDegrees(-30)
            .animate("InOutCubic", progress);
        } else {
          // third person animations
          builder
            .get("left_arm")
            .moveX(0)
            .moveY(0)
            .moveZ(-3)
            .animate("InOutCubic", progress);
          builder.get("chest").animate("InOutCubic", progress);
          builder
            .get("right_arm")
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
PalladiumEvents.registerAnimations((event) => {
  event.register(
    "satsu_iron_man_addon/colocacion_de_armadura.7.mark.50.part.1",
    10,
    (builder) => {
      // Gets the current animation timer progress from the ability, returned value is a number from 0.0 to 1.0
      const progress = animationUtil.getAnimationTimerAbilityValue(
        builder.getPlayer(),
        "satsu_iron_man_addon:kube_animations",
        "mark_50_anim",
        builder.getPartialTicks(),
        0,
        3
      );

      // only apply animation if progress is above 0!
      if (progress > 0.0) {
        const halfPi = 1.57079632679;

        // if first person
        if (builder.isFirstPerson()) {
          builder
            .get("left_arm")
            .setXRotDegrees(49)
            .setYRotDegrees(-30)
            .setZRotDegrees(30)
            .animate("InOutCubic", progress);
        }
        if (builder.isFirstPerson()) {
          builder
            .get("right_arm")
            .setXRotDegrees(-85)
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
            .moveX(0)
            .moveY(0)
            .moveZ(0)
            .animate("InOutCubic", progress);
          builder.get("chest").animate("InOutCubic", progress);
          builder
            .get("right_arm")
            .setXRotDegrees(-85)
            .setYRotDegrees(0)
            .setZRotDegrees(0)
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
  event.register(
    "satsu_iron_man_addon/colocacion_de_armadura.7.mark.50.part.2",
    10,
    (builder) => {
      // Gets the current animation timer progress from the ability, returned value is a number from 0.0 to 1.0
      const progress = animationUtil.getAnimationTimerAbilityValue(
        builder.getPlayer(),
        "satsu_iron_man_addon:kube_animations",
        "mark_50_anim",
        builder.getPartialTicks(),
        4,
        6
      );

      // only apply animation if progress is above 0!
      if (progress > 0.0) {
        const halfPi = 1.57079632679;

        // if first person
        if (builder.isFirstPerson()) {
          builder
            .get("left_arm")
            .setXRotDegrees(49)
            .setYRotDegrees(-30)
            .setZRotDegrees(30)
            .animate("InOutCubic", progress);
        }
        if (builder.isFirstPerson()) {
          builder
            .get("right_arm")
            .setXRotDegrees(-85)
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
            .moveX(0)
            .moveY(0)
            .moveZ(0)
            .animate("InOutCubic", progress);
          builder.get("chest").animate("InOutCubic", progress);
          builder
            .get("right_arm")
            .setXRotDegrees(-80.7517)
            .setYRotDegrees(-57.1594)
            .setZRotDegrees(-7.7901)
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
PalladiumEvents.registerAnimations((event) => {
  event.register(
    "satsu_iron_man_addon/colocacion_de_armadura.8.mark.47.part.1",
    10,
    (builder) => {
      // Gets the current animation timer progress from the ability, returned value is a number from 0.0 to 1.0
      const progress = animationUtil.getAnimationTimerAbilityValue(
        builder.getPlayer(),
        "satsu_iron_man_addon:kube_animations",
        "mark_47_anim",
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
            .setZRotDegrees(0)
            .moveX(0)
            .moveY(0)
            .moveZ(0)
            .animate("InOutCubic", progress);
          builder.get("chest").animate("InOutCubic", progress);
          builder
            .get("right_arm")
            .setXRotDegrees(-85)
            .setYRotDegrees(0)
            .setZRotDegrees(0)
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
  event.register(
    "satsu_iron_man_addon/colocacion_de_armadura.7.mark.47.part.2",
    10,
    (builder) => {
      // Gets the current animation timer progress from the ability, returned value is a number from 0.0 to 1.0
      const progress = animationUtil.getAnimationTimerAbilityValue(
        builder.getPlayer(),
        "satsu_iron_man_addon:kube_animations",
        "mark_47_anim.2",
        builder.getPartialTicks()
      );

      // only apply animation if progress is above 0!
      if (progress > 0.0) {
        const halfPi = 1.57079632679;

        // if first person
        if (builder.isFirstPerson()) {
          builder
            .get("left_arm")
            .setXRotDegrees(49)
            .setYRotDegrees(-30)
            .setZRotDegrees(30)
            .animate("InOutCubic", progress);
        }
        if (builder.isFirstPerson()) {
          builder
            .get("right_arm")
            .setXRotDegrees(-85)
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
            .moveX(0)
            .moveY(0)
            .moveZ(0)
            .animate("InOutCubic", progress);
          builder.get("chest").animate("InOutCubic", progress);
          builder
            .get("right_arm")
            .setXRotDegrees(-80.7517)
            .setYRotDegrees(-57.1594)
            .setZRotDegrees(-7.7901)
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
  event.register(
    "satsu_iron_man_addon/colocacion_de_armadura.7.mark.47.part.3",
    10,
    (builder) => {
      // Gets the current animation timer progress from the ability, returned value is a number from 0.0 to 1.0
      const progress = animationUtil.getAnimationTimerAbilityValue(
        builder.getPlayer(),
        "satsu_iron_man_addon:kube_animations",
        "mark_47_anim.3",
        builder.getPartialTicks()
      );

      // only apply animation if progress is above 0!
      if (progress > 0.0) {
        const halfPi = 1.57079632679;

        // if first person
        if (builder.isFirstPerson()) {
          builder
            .get("left_arm")
            .setXRotDegrees(90)
            .setYRotDegrees(0)
            .setZRotDegrees(0)
            .animate("InOutCubic", progress);
        }
        if (builder.isFirstPerson()) {
          builder
            .get("right_arm")
            .setXRotDegrees(80)
            .setYRotDegrees(-30)
            .setZRotDegrees(-30)
            .animate("InOutCubic", progress);
        } else {
          // third person animations
          builder
            .get("left_arm")
            .setXRotDegrees(0)
            .setYRotDegrees(0)
            .setZRotDegrees(-75)
            .moveX(0)
            .moveY(0)
            .moveZ(0)
            .animate("InOutCubic", progress);
          builder.get("chest").animate("InOutCubic", progress);
          builder
            .get("right_arm")
            .setXRotDegrees(0)
            .setYRotDegrees(0)
            .setZRotDegrees(75)
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
PalladiumEvents.registerAnimations((event) => {
  event.register(
    "satsu_iron_man_addon/colocacion_de_armadura.11.mark.taken",
    10,
    (builder) => {
      // Gets the current animation timer progress from the ability, returned value is a number from 0.0 to 1.0
      const progress = animationUtil.getAnimationTimerAbilityValue(
        builder.getPlayer(),
        "satsu_iron_man_addon:kube_animations",
        "mark.taken_activaded_anim",
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
            .setXRotDegrees(0)
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
            .moveX(0)
            .moveY(0)
            .moveZ(0)
            .animate("InOutCubic", progress);
          builder
            .get("right_arm")
            .setXRotDegrees(-90)
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
            .setXRotDegrees(0)
            .moveY(0)
            .moveZ(0)
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
});
PalladiumEvents.registerAnimations((event) => {
  event.register("satsu_iron_man_addon/clap_smoke_hands.1", 10, (builder) => {
    // Gets the current animation timer progress from the ability, returned value is a number from 0.0 to 1.0
    const progress = animationUtil.getAnimationTimerAbilityValue(
      builder.getPlayer(),
      "satsu_iron_man_addon:kube_animations",
      "mark.1873.clap_smoke_hands",
      builder.getPartialTicks(),
      0,
      3
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
          .setXRotDegrees(0)
          .setYRotDegrees(-30)
          .setZRotDegrees(-30)
          .animate("InOutCubic", progress);
      } else {
        // third person animations
        builder
          .get("left_arm")
          .setXRotDegrees(-90)
          .setYRotDegrees(0)
          .setZRotDegrees(0)
          .moveX(0)
          .moveY(0)
          .moveZ(0)
          .animate("InOutCubic", progress);
        builder
          .get("right_arm")
          .setXRotDegrees(-90)
          .setYRotDegrees(0)
          .setZRotDegrees(0)
          .moveX(0)
          .moveY(0)
          .moveZ(0)
          .animate("InOutCubic", progress);
        builder;
      }
    }
  });
  event.register("satsu_iron_man_addon/clap_smoke_hands.2", 10, (builder) => {
    // Gets the current animation timer progress from the ability, returned value is a number from 0.0 to 1.0
    const progress = animationUtil.getAnimationTimerAbilityValue(
      builder.getPlayer(),
      "satsu_iron_man_addon:kube_animations",
      "mark.1873.clap_smoke_hands",
      builder.getPartialTicks(),
      4,
      6
    );

    // only apply animation if progress is above 0!
    if (progress > 0.0) {
      const halfPi = 1.57079632679;
      // if first person
      if (builder.isFirstPerson()) {
        builder
          .get("left_arm")
          .setXRotDegrees(-26)
          .setYRotDegrees(30)
          .setZRotDegrees(30)
          .animate("InOutCubic", progress);
      }
      if (builder.isFirstPerson()) {
        builder
          .get("right_arm")
          .setXRotDegrees(-26)
          .setYRotDegrees(-30)
          .setZRotDegrees(-30)
          .animate("InOutCubic", progress);
      } else {
        // third person animations
        builder
          .get("left_arm")
          .setXRotDegrees(-90)
          .setYRotDegrees(25)
          .setZRotDegrees(0)
          .moveX(0)
          .moveY(0)
          .moveZ(0)
          .animate("InOutCubic", progress);
        builder
          .get("right_arm")
          .setXRotDegrees(-90)
          .setYRotDegrees(-25)
          .setZRotDegrees(0)
          .moveX(0)
          .moveY(0)
          .moveZ(0)
          .animate("InOutCubic", progress);
        builder;
      }
    }
  });
});
PalladiumEvents.registerAnimations((event) => {
  event.register("satsu_iron_man_addon/blade_attack", 10, (builder) => {
    // Gets the current animation timer progress from the ability, returned value is a number from 0.0 to 1.0
    const progress = animationUtil.getAnimationTimerAbilityValue(
      builder.getPlayer(),
      "satsu_iron_man_addon:kube_animations",
      "blade_attack_1",
      builder.getPartialTicks()
    );

    // only apply animation if progress is above 0!
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
  event.register("satsu_iron_man_addon/blade_attackr.2", 10, (builder) => {
    // Gets the current animation timer progress from the ability, returned value is a number from 0.0 to 1.0
    const progress = animationUtil.getAnimationTimerAbilityValue(
      builder.getPlayer(),
      "satsu_iron_man_addon:kube_animations",
      "blade_attack_2",
      builder.getPartialTicks()
    );

    // only apply animation if progress is above 0!
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
PalladiumEvents.registerAnimations((event) => {
  event.register(
    "satsu_iron_man_addon/no_swim_mark_animation.mark.37",
    10,
    (builder) => {
      // Gets the current animation timer progress from the ability, returned value is a number from 0.0 to 1.0
      const progress = animationUtil.getAnimationTimerAbilityValue(
        builder.getPlayer(),
        "satsu_iron_man_addon:kube_animations",
        "no_swim_mark_animation",
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
            .get("right_arm")
            .setXRotDegrees(12.3265)
            .setYRotDegrees(-2.8631)
            .setZRotDegrees(6.9349)
            .animate("InOutCubic", progress);
          builder
            .get("left_arm")
            .setXRotDegrees(12.3265)
            .setYRotDegrees(2.8631)
            .setZRotDegrees(-6.9349)
            .animate("InOutCubic", progress);
          builder
            .get("right_leg")
            .setXRotDegrees(0)
            .setYRotDegrees(0)
            .animate("InOutCubic", progress);
          builder
            .get("left_leg")
            .setXRotDegrees(0)
            .setYRotDegrees(0)
            .animate("InOutCubic", progress);
          builder
            .get("body")
            .setXRotDegrees(0)
            .setYRotDegrees(0)
            .setZRotDegrees(0)
            .animate("InOutCubic", progress);
          builder;
        }
      }
    }
  );
  event.register(
    "satsu_iron_man_addon/movement_underwater_skill.mark.37",
    10,
    (builder) => {
      // Gets the current animation timer progress from the ability, returned value is a number from 0.0 to 1.0
      const progress = animationUtil.getAnimationTimerAbilityValue(
        builder.getPlayer(),
        "satsu_iron_man_addon:kube_animations",
        "movement_underwater_skill",
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
            .get("right_arm")
            .setXRotDegrees(22.3265)
            .setYRotDegrees(-2.8631)
            .setZRotDegrees(6.9349)
            .animate("InOutCubic", progress);
          builder
            .get("left_arm")
            .setXRotDegrees(22.3265)
            .setYRotDegrees(2.8631)
            .setZRotDegrees(-6.9349)
            .animate("InOutCubic", progress);
          builder
            .get("right_leg")
            .setXRotDegrees(25)
            .setYRotDegrees(0)
            .animate("InOutCubic", progress);
          builder
            .get("left_leg")
            .setXRotDegrees(25)
            .setYRotDegrees(0)
            .animate("InOutCubic", progress);
          builder;
        }
      }
    }
  );
});
PalladiumEvents.registerAnimations((event) => {
  event.register("satsu_iron_man_addon/mallet_smash.1", 10, (builder) => {
    // Gets the current animation timer progress from the ability, returned value is a number from 0.0 to 1.0
    const progress = animationUtil.getAnimationTimerAbilityValue(
      builder.getPlayer(),
      "satsu_iron_man_addon:kube_animations",
      "mallet_smash_1",
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
          .setYRotDegrees(20)
          .setZRotDegrees(20)
          .animate("InOutCubic", progress);
      }
      if (builder.isFirstPerson()) {
        builder
          .get("right_arm")
          .setXRotDegrees(0)
          .setYRotDegrees(-20)
          .setZRotDegrees(-20)
          .animate("InOutCubic", progress);
      } else {
        // third person animations
        builder
          .get("left_arm")
          .setXRotDegrees(0)
          .setYRotDegrees(0)
          .setZRotDegrees(-90)
          .moveX(0)
          .moveY(0)
          .moveZ(0)
          .animate("InOutCubic", progress);
        builder
          .get("right_arm")
          .setXRotDegrees(0)
          .setYRotDegrees(0)
          .setZRotDegrees(90)
          .moveX(0)
          .moveY(0)
          .moveZ(0)
          .animate("InOutCubic", progress);
        builder;
      }
    }
  });
  event.register("satsu_iron_man_addon/mallet_smash.2", 10, (builder) => {
    // Gets the current animation timer progress from the ability, returned value is a number from 0.0 to 1.0
    const progress = animationUtil.getAnimationTimerAbilityValue(
      builder.getPlayer(),
      "satsu_iron_man_addon:kube_animations",
      "mallet_smash_2",
      builder.getPartialTicks()
    );

    // only apply animation if progress is above 0!
    if (progress > 0.0) {
      const halfPi = 1.57079632679;
      // if first person
      if (builder.isFirstPerson()) {
        builder
          .get("left_arm")
          .setXRotDegrees(-23)
          .setYRotDegrees(15)
          .setZRotDegrees(15)
          .animate("InOutCubic", progress);
      }
      if (builder.isFirstPerson()) {
        builder
          .get("right_arm")
          .setXRotDegrees(-25)
          .setYRotDegrees(-15)
          .setZRotDegrees(-15)
          .animate("InOutCubic", progress);
      } else {
        // third person animations
        builder
          .get("left_arm")
          .setXRotDegrees(-62.5)
          .setYRotDegrees(0)
          .setZRotDegrees(-90)
          .moveX(0)
          .moveY(0)
          .moveZ(0)
          .animate("InOutCubic", progress);
        builder
          .get("right_arm")
          .setXRotDegrees(-62.5)
          .setYRotDegrees(0)
          .setZRotDegrees(90)
          .moveX(0)
          .moveY(0)
          .moveZ(0)
          .animate("InOutCubic", progress);
        builder;
      }
    }
  });
});
