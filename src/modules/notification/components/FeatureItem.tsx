import { View, Text } from "react-native";

export function FeatureItem({ text }: { text: string }) {
  return (
    <View className="flex flex-row items-center space-x-2">
      <View className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-copy-lighter" />

      <Text className="text-base">{text}</Text>
    </View>
  );
}
