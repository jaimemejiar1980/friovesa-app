import { APP_COLORS } from "../../../constants/colors";
import { checkboxIcon } from "../../../constants/icons";
import { Image } from "expo-image";
import { View, Text, Pressable } from "react-native";

export function CheckBox({ isChecked, onCheck, title }) {
  return (
    <View className="w-full flex flex-row space-x-3 items-center">
      <Pressable
        className="h-8 w-8 border-2 border-border rounded-lg"
        onPress={onCheck}
      >
        {isChecked && (
          <Image
            source={checkboxIcon}
            tintColor={APP_COLORS.secondary}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        )}
      </Pressable>

      <Text>{title}</Text>
    </View>
  );
}
