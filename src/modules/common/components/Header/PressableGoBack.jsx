import { GoBackHeaderIcon } from "./GoBackHeaderIcon";
import { Pressable } from "react-native";
import { router } from "expo-router";

export function PressableGoBack() {
  const handlePressBack = () => {
    router.navigate("../");
  };

  return (
    <Pressable className="w-10" onPress={handlePressBack}>
      <GoBackHeaderIcon />
    </Pressable>
  );
}
