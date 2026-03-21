if (Platform.isClientEnvironment()) {
  ClientEvents.init(event => {
    const $KeyMappingRegistry = Java.loadClass("dev.architectury.registry.client.keymappings.KeyMappingRegistry");
    const $KeyMapping = Java.loadClass("net.minecraft.client.KeyMapping");
    const $GLFWKey = Java.loadClass("org.lwjgl.glfw.GLFW");

    global["WEAPONS_SYSTEM"] = new $KeyMapping(
      "satsu_iron_man_addon.keys.weapons_system",
      $GLFWKey.GLFW_KEY_UNKNOWN,
      "satsu_iron_man_addon.keys"
    );
    $KeyMappingRegistry.register(global["WEAPONS_SYSTEM"]);
  })
}