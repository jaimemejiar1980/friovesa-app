import { Image } from "expo-image";
import { View, Text, TouchableOpacity } from "react-native";
import ShadowView from "../ShadowView";

export default function TouchableCity({ cityTitle, cityIcon, handlePress }) {
  return (
    <ShadowView extraStyles="h-36 md:h-64 rounded-lg bg-white border border-border overflow-hidden">
      <TouchableOpacity
        onPress={handlePress}
        className="h-full w-full overflow-hidden flex flex-row justify-between items-center"
      >
        <View className="h-full w-full absolute z-30">
          <Image
            source={cityIcon}
            style={{
              height: "100%",
              width: "100%",
            }}
            blurRadius={5}
          />
        </View>

        <View className="w-full h-full bg-slate-900/40 absolute z-40" />

        <View className="flex flex-row items-center justify-around w-full z-50 blur-3xl">
          <View className="h-20 w-20 md:h-44 md:w-44 rounded-full overflow-hidden">
            <Image
              source={cityIcon}
              style={{
                height: "100%",
                width: "100%",
              }}
            />
          </View>

          <View className="bg-gray-100/95 rounded-md px-4 py-2">
            <Text className="uppercase text-primary text-center font-bold text-base md:text-3xl">
              {cityTitle}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </ShadowView>
  );
}
