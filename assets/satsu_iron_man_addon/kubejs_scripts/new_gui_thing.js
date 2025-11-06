const InventoryScreen = Java.loadClass(
  "net.minecraft.client.gui.screens.inventory.InventoryScreen"
);
const Quaternionf = Java.loadClass("org.joml.Quaternionf");

PalladiumEvents.registerGuiOverlays((event) => {
  event.register(
    "satsu_iron_man_addon/armor_principal/iron_man_armor_test",
    (
      minecraftClient,
      gui,
      poseStack,
      partialTick,
      screenWidth,
      screenHeight
    ) => {
      if (
        abilityUtil.hasPower(
          minecraftClient.player,
          "satsu_iron_man_addon:armor_principal/iron_man_armor"
        )
      ) {
        let yaw =
          (-(
            (
              minecraftClient.player.yBodyRot + 20
            ) /*'20' is the yaw offset, in degrees; it looks better facing slightly off to the side than straight on*/
          ) *
            JavaMath.PI) /
          180;
        // arguments: (poseStack, x, y, size, quaternion for the rotation, another quaternion (i don't know what it does so i left it null), entity)
        InventoryScreen.renderEntityInInventory(
          poseStack,
          60,
          170,
          30,
          new Quaternionf(Math.cos(0.5 * yaw), 0, -Math.sin(0.5 * yaw), 0),
          null,
          minecraftClient.player
        );
      }
    }
  );
});
