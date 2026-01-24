// Register custom animations
PalladiumEvents.registerAnimations((event) => {
  event.registerForPower(
    "satsu_iron_man_addon/glove_animation_1",
    "satsu_iron_man_addon:clothes/quantum_suit",
    10,
    (builder) => {
      // Gets the current animation timer progress from the ability, returned value is a number from 0.0 to 1.0
      const progress = animationUtil.getAnimationTimerAbilityValue(
        builder.getPlayer(),
        "satsu_iron_man_addon:clothes/quantum_suit",
        "glove_animation_1",
        builder.getPartialTicks(),
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
              .setXRotDegrees(-85.47913)
              .setYRotDegrees(43.00809)
              .setZRotDegrees(-8.28566)
              .animate("InOutCubic", progress);
            builder.get("chest").animate("InOutCubic", progress);
            builder
              .get("right_arm")
              .setXRotDegrees(-93.90019)
              .setYRotDegrees(-65.57834)
              .setZRotDegrees(59.11365)
              .animate("InOutCubic", progress);
            builder.get("chest").animate("InOutCubic", progress);
          }
        }
    },
  );
  event.registerForPower(
    "satsu_iron_man_addon/glove_animation_2",
    "satsu_iron_man_addon:clothes/quantum_suit",
    10,
    (builder) => {
      // Gets the current animation timer progress from the ability, returned value is a number from 0.0 to 1.0
      const progress = animationUtil.getAnimationTimerAbilityValue(
        builder.getPlayer(),
        "satsu_iron_man_addon:clothes/quantum_suit",
        "glove_animation_2",
        builder.getPartialTicks(),
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
              .setXRotDegrees(-85.51662)
              .setYRotDegrees(43.19863)
              .setZRotDegrees(-15.13077)
              .animate("InOutCubic", progress);
            builder.get("chest").animate("InOutCubic", progress);
            builder
              .get("right_arm")
              .setXRotDegrees(-93.90019)
              .setYRotDegrees(-65.57834)
              .setZRotDegrees(59.11365)
              .animate("InOutCubic", progress);
            builder.get("chest").animate("InOutCubic", progress);
          }
        }
    },
  );
});
