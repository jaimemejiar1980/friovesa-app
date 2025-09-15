import { APP_COLORS } from "../../../../constants/colors";
import { Image } from "expo-image";
import { useCart } from "../../../cart/hooks";
import { View, Text, Platform } from "react-native";
import ShadowView from "../ShadowView";

export default function TabBarIconCart({ icon }) {
  const { itemsCount } = useCart();
  const isIos = Platform.OS === "ios";

  return (
    <ShadowView
      extraStyles={`bg-transparent rounded-full ${
        isIos ? "-translate-y-6" : "-translate-y-7"
      }`}
    >
      <View className="w-14 h-14 md:w-16 md:h-16 bg-secondary rounded-full flex flex-row justify-center items-center p-1">
        <View className="w-10">
          {itemsCount > 0 && (
            <View className="absolute right-0 bg-red-500 px-1 rounded-full z-10 ml-1">
              <Text className="text-xs text-white" numberOfLines={1}>
                {itemsCount}
              </Text>
            </View>
          )}
          <View className="flex flex-row justify-center">
            <Image
              source={icon}
              style={{
                width: 25,
                height: 25,
                tintColor: APP_COLORS?.foreground,
              }}
            />
          </View>
        </View>
      </View>
    </ShadowView>
  );
}
