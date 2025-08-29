// Register custom animations
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
    }
  );
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
