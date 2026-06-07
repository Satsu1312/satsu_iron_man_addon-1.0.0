NetworkEvents.dataReceived("satsu_iron_man_addon.modularkey", (event) => {
  const { player, data } = event;
  const dataKey = "satsu_iron_man_addon.modularkey_pressed";

  // Usamos una validación más robusta para el booleano
  // Si data.pressed es undefined o null, ponemos false por seguridad
  let isPressed = !!data.pressed;

  player.persistentData.putBoolean(dataKey, isPressed);

  // LOG PARA DEBUG (Actívalo para ver en la consola si llega el paquete)
  // console.log(`Teclado Modular: ${isPressed ? 'PRESIONADO' : 'SOLTADO'}`);
});
