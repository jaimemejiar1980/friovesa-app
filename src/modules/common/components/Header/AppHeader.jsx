import { APP_COLORS } from "../../../../constants/colors";
import { AppHeaderContainer } from "./AppHeaderContainer";
import { Image } from "expo-image";
import { menuIcon, logoIcon, cartIcon } from "../../../../constants/icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, TouchableOpacity, View } from "react-native";
import { useCart } from "../../../cart/hooks";
import HeaderIcon from "./HeaderIcon";

export default function AppHeader(props) {
  const { itemsCount } = useCart();
  const navigation = props?.navigation;

  const handleToggleDrawer = () => {
    if (!navigation || typeof navigation.toggleDrawer !== "function") {
      return;
    }
    try {
      navigation.toggleDrawer();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <AppHeaderContainer>
        <View className="flex flex-row justify-between items-center py-2">
          <TouchableOpacity onPress={handleToggleDrawer} className="w-2/12">
            <View className="flex flex-row justify-center">
              <HeaderIcon icon={menuIcon} color={APP_COLORS.foreground} />
            </View>
          </TouchableOpacity>

          <View className="w-6/12 md:w-4/12 md:h-12">
            <View className="w-4/5 h-6 mx-auto">
              <Image
                source={logoIcon}
                className="w-full h-full md:w-44 md:h-11 md:mx-auto"
              />
            </View>
          </View>

          <TouchableOpacity
            onPress={() => router.navigate("(tabs)/Cart")}
            className="w-2/12 flex flex-row justify-center"
          >
            <View className="w-11">
              {itemsCount > 0 && (
                <View className="absolute right-0 bg-red-500 px-1 mx-1 rounded-full z-10">
                  <Text className="text-xs text-white" numberOfLines={1}>
                    {itemsCount}
                  </Text>
                </View>
              )}

              <View className="flex flex-row justify-center">
                <HeaderIcon icon={cartIcon} color={APP_COLORS.foreground} />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </AppHeaderContainer>

      <StatusBar style="light" />
    </>
  );
}
