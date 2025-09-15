import { ActiveProductProvider } from "../../src/modules/products";
import { AppHeader, CustomDrawerMenu } from "../../src/modules/common";
import { CartProvider } from "../../src/modules/cart";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function DrawerLayout() {
  return (
    <CartProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ActiveProductProvider>
          <Drawer drawerContent={(props) => <CustomDrawerMenu {...props} />}>
            <Drawer.Screen
              name="(tabs)"
              options={{
                header: (props) => {
                  return <AppHeader {...props} />;
                },
              }}
            />
          </Drawer>
        </ActiveProductProvider>
      </GestureHandlerRootView>
    </CartProvider>
  );
}
