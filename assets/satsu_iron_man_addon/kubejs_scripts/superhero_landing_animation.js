const DEBUG_SUPERHERO_LANDING = false;
const LANDING_POWER = "satsu_iron_man_addon:kube_animations";
const LANDING_DURATION_TICKS = 26;
const LANDING_COOLDOWN_TICKS = 30;
const LANDING_MIN_DROP_BLOCKS = 10;
const LANDING_MIN_DOWN_SPEED = 0.72;
const CuriosApi = Java.loadClass("top.theillusivec4.curios.api.CuriosApi");

let landingLastY = null;
let landingWasGrounded = true;
let landingAirStartY = null;
let landingMaxDownSpeed = 0;
let landingCooldown = 0;

global.satsu_superhero_landing_ticks = 0;

const landingNumber = (value, fallback) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
};

const landingEnabled = (player, power, ability) => {
  try {
    return abilityUtil.isEnabled(player, power, ability);
  } catch (ignored) {
    return false;
  }
};

const landingProp = (player, key, fallback) => {
  try {
    const value = palladium.getProperty(player, key);
    return value === null || value === undefined ? fallback : value;
  } catch (ignored) {
    return fallback;
  }
};

// Changed: detect Satsu suits in the Curios technology armor slot.
const landingCuriosSuitActive = (player) => {
  try {
    let active = false;
    CuriosApi.getCuriosHelper().getCuriosHandler(player).ifPresent(handler => {
      const stacksHandler = handler.getStacksHandler("tecnology_armor");
      if (stacksHandler.isPresent()) {
        const stack = Item.of(stacksHandler.get().getStacks().getStackInSlot(0));
        active = !stack.isEmpty() && String(stack.id).indexOf("satsu_iron_man_addon:") === 0;
      }
    });
    return active;
  } catch (ignored) {
    return false;
  }
};

const landingOnGround = (player) => {
  try {
    if (player.isOnGround) return !!player.isOnGround();
  } catch (ignored) {}
  try {
    if (typeof player.onGround === "function") return !!player.onGround();
  } catch (ignored) {}
  try {
    return !!player.onGround;
  } catch (ignored) {
    return false;
  }
};

// Changed: landing only triggers while a Satsu suit is active.
const landingSuitActive = (player) => {
  if (!player) return false;
  if (landingCuriosSuitActive(player)) return true;
  if (String(landingProp(player, "satsu_iron_man_addon_armor_activated", "off")) === "on") return true;
  if (landingEnabled(player, "satsu_iron_man_addon:ia_stuff/ia", "armor_on_body")) return true;
  return landingEnabled(player, LANDING_POWER, "flight_animation_fast") ||
    landingEnabled(player, LANDING_POWER, "fall_flying") ||
    landingEnabled(player, LANDING_POWER, "animation_falling");
};

// Changed: briefly block movement/flying while landing pose plays.
const freezeLandingMovement = (player) => {
  try {
    if (player.setDeltaMovement) player.setDeltaMovement(0, 0, 0);
  } catch (ignored) {}
  try {
    if (player.setSprinting) player.setSprinting(false);
  } catch (ignored) {}
  try {
    const abilities = player.getAbilities ? player.getAbilities() : null;
    if (abilities) abilities.flying = false;
  } catch (ignored) {}
};

ClientEvents.tick(() => {
  const player = Client.player;
  if (!player) {
    landingLastY = null;
    landingWasGrounded = true;
    landingAirStartY = null;
    landingMaxDownSpeed = 0;
    landingCooldown = 0;
    global.satsu_superhero_landing_ticks = 0;
    return;
  }

  const y = landingNumber(player.y, landingNumber(player.getY ? player.getY() : 0, 0));
  const grounded = landingOnGround(player);

  if (landingLastY === null) {
    landingLastY = y;
    landingWasGrounded = grounded;
    return;
  }

  if (landingCooldown > 0) landingCooldown--;
  if (global.satsu_superhero_landing_ticks > 0) {
    global.satsu_superhero_landing_ticks--;
    freezeLandingMovement(player);
  }

  const dy = y - landingLastY;
  if (!grounded) {
    if (landingWasGrounded || landingAirStartY === null) {
      landingAirStartY = y;
      landingMaxDownSpeed = 0;
    }
    landingMaxDownSpeed = Math.max(landingMaxDownSpeed, -dy);
  }

  // Changed: trigger only after a real hard fall, not normal jumps.
  if (grounded && !landingWasGrounded && landingSuitActive(player) && landingCooldown <= 0) {
    const drop = landingAirStartY === null ? 0 : landingAirStartY - y;
    if (drop >= LANDING_MIN_DROP_BLOCKS || landingMaxDownSpeed >= LANDING_MIN_DOWN_SPEED) {
      global.satsu_superhero_landing_ticks = LANDING_DURATION_TICKS;
      landingCooldown = LANDING_COOLDOWN_TICKS;
      if (DEBUG_SUPERHERO_LANDING) player.tell(Component.literal("[Landing] Triggered"));
    }
  }

  if (grounded) {
    landingAirStartY = null;
    landingMaxDownSpeed = 0;
  }

  landingWasGrounded = grounded;
  landingLastY = y;
});

PalladiumEvents.registerAnimations((event) => {
  // Changed: global superhero landing pose for Satsu animation power.
  event.registerForPower(
    "satsu_iron_man_addon/global_superhero_landing",
    LANDING_POWER,
    12,
    (builder) => {
      const ticks = Number(global.satsu_superhero_landing_ticks || 0);
      if (ticks <= 0) return;

      const progress = ticks / LANDING_DURATION_TICKS;
      const ease = progress < 0.65 ? 1 : progress / 0.65;

      if (builder.isFirstPerson()) {
        builder.get("right_arm")
          .setXRotDegrees(52)
          .setYRotDegrees(-28)
          .setZRotDegrees(-28)
          .animate("InOutCubic", ease);
        builder.get("left_arm")
          .setXRotDegrees(-8)
          .setYRotDegrees(0)
          .setZRotDegrees(0)
          .animate("InOutCubic", ease);
        return;
      }

      builder.get("chest")
        .moveY(8.5)
        .moveZ(-7.4)
        .setXRotDegrees(62.5)
        .animate("InOutCubic", ease);
      builder.get("head")
        .setXRotDegrees(10)
        .moveY(11)
        .moveZ(-9.4)
        .animate("InOutCubic", ease);
      builder.get("right_arm")
        .setZRotDegrees(80)
        .moveX(1.4)
        .moveY(7.9)
        .moveZ(-7)
        .animate("InOutCubic", ease);
      builder.get("left_arm")
        .moveY(7.9)
        .moveZ(-7)
        .scaleY(1.3)
        .animate("InOutCubic", ease);
      builder.get("right_leg")
        .setXRotDegrees(-22.3)
        .setYRotDegrees(2.9)
        .setZRotDegrees(6.9)
        .moveY(2)
        .moveZ(0.8)
        .animate("InOutCubic", ease);
      builder.get("left_leg")
        .setXRotDegrees(28.5)
        .setYRotDegrees(-10.5)
        .setZRotDegrees(-10.7)
        .moveY(1.7)
        .moveZ(2.7)
        .animate("InOutCubic", ease);
    }
  );
});
