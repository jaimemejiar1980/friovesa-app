import { GoBackIcon } from "./GoBackIcon";
import { router } from "expo-router";
import { View, Pressable } from "react-native";

export function GoBackTabsHeader() {
  const handlePressBack = () => {
    router.navigate("../");
  };

  return (
    <View className="pl-1 pt-1 absolute z-50">
      <Pressable
        className="p-1 rounded-full bg-gray-500/60"
        onPress={handlePressBack}
      >
        <GoBackIcon />
      </Pressable>
    </View>
  );
}
