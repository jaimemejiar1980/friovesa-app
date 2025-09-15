import { View, Text, Pressable } from "react-native";

export function VariationTag({ handlePress, isActive, title }) {
  return (
    <Pressable onPress={handlePress}>
      <View
        className={`py-2 px-4 rounded-3xl border ${
          isActive ? "border-primary" : "border-gray-400"
        }`}
      >
        <Text className={`font-bold ${isActive ? "" : "text-gray-400"}`}>
          {title}
        </Text>
      </View>
    </Pressable>
  );
}
