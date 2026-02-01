const ALLOWED = new Set([
  "satsu_iron_man_addon.PrimaryColour",
  "satsu_iron_man_addon.SecondaryColour",
  "satsu_iron_man_addon.TertiaryColour",
  "satsu_iron_man_addon_beam_core_color",
  "satsu_iron_man_addon_beam_glow_color" // N
]);

NetworkEvents.dataReceived('satsu_apply_color', event => {
  const player = event.player;
  const data = event.data;
  if (!player || !data) return;

  const prop = data.property;
  const rawVal = data.value;

  if (typeof prop !== 'string') return;
  if (rawVal === undefined || rawVal === null) return;
const allowed = [
  "satsu_iron_man_addon.PrimaryColour",
  "satsu_iron_man_addon.SecondaryColour",
  "satsu_iron_man_addon.TertiaryColour",
  "satsu_iron_man_addon_beam_core_color" ,
  "satsu_iron_man_addon_beam_glow_color" // NEW
];
  if (!allowed.includes(prop)) return;

  let value = Number(rawVal);
  if (Number.isNaN(value)) return;
  value = Math.floor(value) & 0xFFFFFF;

  palladium.setProperty(player, prop, value);
});