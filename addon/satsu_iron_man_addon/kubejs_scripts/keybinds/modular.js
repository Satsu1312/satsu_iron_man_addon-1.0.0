if (Platform.isClientEnvironment()) {
  ClientEvents.init(event => {
    const $KeyMappingRegistry = Java.loadClass("dev.architectury.registry.client.keymappings.KeyMappingRegistry");
    const $KeyMapping = Java.loadClass("net.minecraft.client.KeyMapping");
    const $GLFWKey = Java.loadClass("org.lwjgl.glfw.GLFW");

    global["modular_key"] = new $KeyMapping(
      "satsu_iron_man_addon.keys.modular_key",
      $GLFWKey.GLFW_KEY_UNKNOWN,
      "satsu_iron_man_addon.keys"
    );
    $KeyMappingRegistry.register(global["modular_key"]);
  })
}