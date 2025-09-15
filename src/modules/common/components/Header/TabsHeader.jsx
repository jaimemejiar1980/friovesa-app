import { GoBackHeaderIcon } from "./GoBackHeaderIcon";
import { InnerHeaderContainer } from "./InnerHeaderContainer";
import { router, usePathname } from "expo-router";
import { View, Pressable, Text } from "react-native";

export function TabsHeader({ title }) {
  const pathName = usePathname();

  const handlePressBack = () => {
    /**
     * Prevent navigating directly to the "Home" screen when the current screen is "ordersHistory".
     *
     * When accessing the "ordersHistory" screen via the Drawer, the "Settings" screen route
     * may not exist in the navigation stack. This ensures the user navigates to the "Settings"
     * screen instead when this function is called.
     */
    if (pathName === "/Settings/ordersHistory") {
      router.navigate("../Settings");
      return;
    }

    router.navigate("../");
  };

  return (
    <InnerHeaderContainer>
      <View className="w-3/12 pr-1">
        <Pressable className="w-10" onPress={handlePressBack}>
          <GoBackHeaderIcon />
        </Pressable>
      </View>

      {title && (
        <View className="w-6/12 px-1">
          <Text className="text-lg text-copy-lighter font-bold text-center">
            {title}
          </Text>
        </View>
      )}
    </InnerHeaderContainer>
  );
}
