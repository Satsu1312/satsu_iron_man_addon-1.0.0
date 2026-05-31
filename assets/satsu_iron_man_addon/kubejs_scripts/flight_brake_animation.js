const DEBUG_FLIGHT_BRAKE = false;
const SATSU_ANIMATION_POWER = "satsu_iron_man_addon:kube_animations";
const SATSU_MAIN_POWER = "satsu_iron_man_addon:iron_man/main_power/main";
const SATSU_WAR_MACHINE_POWER = "satsu_iron_man_addon:war_machine/main_power/main";
const SATSU_IRON_HEART_POWER = "satsu_iron_man_addon:iron_heart/main_power/main";

const BRAKE_FAST_KMH = 20;
const BRAKE_STOP_KMH = 10;
const BRAKE_COOLDOWN_TICKS = 44;
const BRAKE_DURATION_TICKS = 34;
const LANDING_BRAKE_BLOCK_TICKS = 24;

let brakeLastX = null;
let brakeLastY = null;
let brakeLastZ = null;
let brakeLastSpeed = 0;
let brakeWasFastFlying = false;
let brakeProgress = 0;
let brakeCooldown = 0;
let landingBrakeBlock = 0;

const brakeNumber = (value, fallback) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
};

const brakeEnabled = (player, power, ability) => {
  try {
    return abilityUtil.isEnabled(player, power, ability);
  } catch (ignored) {
    return false;
  }
};

const brakeProp = (player, key, fallback) => {
  try {
    const value = palladium.getProperty(player, key);
    return value === null || value === undefined ? fallback : value;
  } catch (ignored) {
    return fallback;
  }
};

// Changed: keep brake animation limited to active Satsu flight/suit states.
const hasSatsuSuitActive = (player) => {
  if (!player) return false;
  if (String(brakeProp(player, "satsu_iron_man_addon_armor_activated", "off")) === "on") return true;
  if (brakeEnabled(player, SATSU_ANIMATION_POWER, "flight_animation_fast")) return true;
  if (brakeEnabled(player, SATSU_ANIMATION_POWER, "fall_flying")) return true;
  return brakeEnabled(player, SATSU_MAIN_POWER, "flight.fall.animation") ||
    brakeEnabled(player, SATSU_WAR_MACHINE_POWER, "flight.fall.animation") ||
    brakeEnabled(player, SATSU_IRON_HEART_POWER, "flight.fall.animation");
};

const isFlightState = (player) => {
  try {
    if (player.isFallFlying && player.isFallFlying()) return true;
  } catch (ignored) {}
  try {
    if (player.getAbilities && player.getAbilities().flying) return true;
  } catch (ignored) {}
  return brakeEnabled(player, SATSU_MAIN_POWER, "flight.fall.animation") ||
    brakeEnabled(player, SATSU_WAR_MACHINE_POWER, "flight.fall.animation") ||
    brakeEnabled(player, SATSU_IRON_HEART_POWER, "flight.fall.animation");
};

// Changed: landing animation blocks brake animation while landing is active.
const isLandingPoseActive = (player) =>
  Number(global.satsu_superhero_landing_ticks || 0) > 0 ||
  brakeEnabled(player, SATSU_ANIMATION_POWER, "fall_flying") ||
  brakeEnabled(player, SATSU_ANIMATION_POWER, "animation_falling");

ClientEvents.tick(() => {
  const player = Client.player;
  if (!player) {
    brakeLastX = null;
    brakeLastY = null;
    brakeLastZ = null;
    brakeLastSpeed = 0;
    brakeProgress = 0;
    brakeCooldown = 0;
    landingBrakeBlock = 0;
    return;
  }

  const x = brakeNumber(player.x, brakeNumber(player.getX ? player.getX() : 0, 0));
  const y = brakeNumber(player.y, brakeNumber(player.getY ? player.getY() : 0, 0));
  const z = brakeNumber(player.z, brakeNumber(player.getZ ? player.getZ() : 0, 0));

  if (brakeLastX === null) {
    brakeLastX = x;
    brakeLastY = y;
    brakeLastZ = z;
    return;
  }

  const dx = x - brakeLastX;
  const dy = y - brakeLastY;
  const dz = z - brakeLastZ;
  const speedKmh = Math.sqrt(dx * dx + dy * dy + dz * dz) * 20 * 3.6;
  const fastFlying = brakeEnabled(player, SATSU_ANIMATION_POWER, "flight_animation_fast");
  const flightNow = isFlightState(player);
  const landingPoseActive = isLandingPoseActive(player);

  if (landingPoseActive) {
    landingBrakeBlock = LANDING_BRAKE_BLOCK_TICKS;
    brakeProgress = 0;
    brakeWasFastFlying = false;
  } else if (landingBrakeBlock > 0) {
    landingBrakeBlock--;
  }

  const canBrake = hasSatsuSuitActive(player) && landingBrakeBlock <= 0 && (flightNow || fastFlying || brakeWasFastFlying);

  if (brakeCooldown > 0) brakeCooldown--;
  if (brakeProgress > 0) brakeProgress--;

  // Changed: trigger brake on hard speed drop or fast-flight stop.
  if (canBrake && brakeCooldown <= 0 && ((brakeLastSpeed > BRAKE_FAST_KMH && speedKmh < BRAKE_STOP_KMH) || (brakeWasFastFlying && !fastFlying))) {
    brakeProgress = BRAKE_DURATION_TICKS;
    brakeCooldown = BRAKE_COOLDOWN_TICKS;
    if (DEBUG_FLIGHT_BRAKE) player.tell(Component.literal("[Flight Brake] Triggered"));
  }

  brakeLastSpeed = speedKmh;
  brakeWasFastFlying = fastFlying;
  brakeLastX = x;
  brakeLastY = y;
  brakeLastZ = z;
});

PalladiumEvents.registerAnimations((event) => {
  // Changed: global hand-forward braking pose for Satsu animation power.
  event.registerForPower(
    "satsu_iron_man_addon/global_flight_brake",
    SATSU_ANIMATION_POWER,
    20,
    (builder) => {
      if (brakeProgress <= 0) return;

      const progress = brakeProgress / BRAKE_DURATION_TICKS;
      const ease = progress < 0.5 ? progress * 2 : (1 - progress) * 2;

      if (builder.isFirstPerson()) {
        builder.get("right_arm")
          .setXRotDegrees(-72)
          .setYRotDegrees(-10)
          .setZRotDegrees(4)
          .animate("InOutCubic", ease);
        builder.get("left_arm")
          .setXRotDegrees(-72)
          .setYRotDegrees(10)
          .setZRotDegrees(-4)
          .animate("InOutCubic", ease);
        return;
      }

      builder.get("chest")
        .setXRotDegrees(14)
        .moveZ(-1.5)
        .animate("InOutCubic", ease);
      builder.get("right_arm")
        .setXRotDegrees(-78)
        .setYRotDegrees(-14)
        .setZRotDegrees(8)
        .animate("InOutCubic", ease);
      builder.get("left_arm")
        .setXRotDegrees(-78)
        .setYRotDegrees(14)
        .setZRotDegrees(-8)
        .animate("InOutCubic", ease);
      builder.get("right_leg")
        .setXRotDegrees(18)
        .setZRotDegrees(5)
        .animate("InOutCubic", ease);
      builder.get("left_leg")
        .setXRotDegrees(18)
        .setZRotDegrees(-5)
        .animate("InOutCubic", ease);
    }
  );
});
