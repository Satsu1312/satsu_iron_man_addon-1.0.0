// Carga la clase de Curios de forma segura
const CuriosApi = Java.loadClass('top.theillusivec4.curios.api.CuriosApi');

StartupEvents.registry("palladium:condition_serializer", (event) => {
  event
    .create("satsu_iron_man_addon:armor_durability")
    .addProperty("slot", "string", "head", "Slot name: head, chest, legs, feet, or specific curio slot name")
    .addProperty("divider", "float", 1.0, "Division factor")
    .addProperty("operation_type", "string", ">=", "Operators: >, >=, <, <=")
    .test((entity, props) => {
      const slotName = props.get("slot");
      const divider = props.get("divider");
      const opType = props.get("operation_type");

      if (!entity || divider <= 0) return false;

      let stack = null;

      // 1. Intentar Vanilla
      const armorSlots = ["head", "chest", "legs", "feet"];
      if (armorSlots.includes(slotName.toLowerCase())) {
        stack = entity.getEquipment(slotName.toLowerCase());
      } 
      // 2. Intentar Curios
      else if (Platform.isLoaded("curios")) {
        try {
          // Obtenemos el LazyOptional
          let lazyInv = CuriosApi.getCuriosInventory(entity);
          
          // En lugar de .get() o .resolve(), usamos .orElse(null) que es la forma segura
          let inv = lazyInv.orElse(null);
          
          if (inv) {
            // Accedemos al mapa de slots disponibles
            let curiosMap = inv.getCurios(); 
            
            if (curiosMap.containsKey(slotName)) {
                // Obtenemos el stack
                stack = curiosMap.get(slotName).getStacks().getStackInSlot(0);
            } else {
                console.error("[ArmorDurability] Error: El slot '" + slotName + "' no existe.");
                console.error("[ArmorDurability] Slots disponibles: " + curiosMap.keySet().toString());
            }
          }
        } catch (e) {
          console.error("[ArmorDurability] Error grave al acceder a Curios: " + e);
        }
      }

      if (!stack || stack.isEmpty()) return false;

      const maxDurability = stack.maxDamage;
      if (maxDurability <= 0) return false;

      const durabilityLeft = maxDurability - stack.damageValue;
      const requiredDurability = maxDurability / divider;

      const ops = {
        ">=": (a, b) => a >= b,
        ">":  (a, b) => a > b,
        "<=": (a, b) => a <= b,
        "<":  (a, b) => a < b,
      };

      const opFn = ops[opType];
      return opFn ? opFn(durabilityLeft, requiredDurability) : false;
    });
});