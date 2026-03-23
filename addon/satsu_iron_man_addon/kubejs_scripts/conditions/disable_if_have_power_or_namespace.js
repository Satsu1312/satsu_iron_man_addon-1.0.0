StartupEvents.registry("palladium:condition_serializer", (event) => {
  event
    .create("satsu_iron_man_addon:disable_if_have_power_or_namespace")
    .addProperty("powers", "string_array", [], "Superpower IDs to check.")
    .addProperty("namespaces", "string_array", [], "Namespaces to check (e.g., 'endosym').")
    .addProperty("ignore_powers", "string_array", [], "Superpower IDs to ignore.")
    .test((entity, props) => {
      if (!props) return false;

      const powers = props.get("powers") ?? [];
      const namespaces = props.get("namespaces") ?? [];
      const ignore = props.get("ignore_powers") ?? [];

      // Si el jugador tiene alguno de los poderes prohibidos → false
      if (powers.some((id) => palladium.superpowers.hasSuperpower(entity, id))) {
        return false;
      }

      // Si no hay namespaces → true
      if (namespaces.length === 0) return true;

      // Revisar cada namespace
      return namespaces.every((ns) => {
        if (!ns || !String(ns).trim()) return true;

        const ids = palladium.powers.getPowerIdsForNamespace(entity, ns).map(String);
        if (ids.length === 0) return true;

        // Si existe algún poder en el namespace que NO esté en la lista de ignorados → false
        return ids.every((id) => ignore.includes(id));
      });
    });
});