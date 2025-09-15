import { View, Text, Pressable } from "react-native";

export default function CheckoutStatus({
  title,
  isChecked,
  index,
  handleMove,
  isVisited,
}) {
  if (isVisited && !isChecked) {
    return (
      <Pressable onPress={() => handleMove(index)}>
        <View className="px-4 py-2 rounded-3xl bg-primary/50">
          <Text className="text-foreground">{title}</Text>
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable onPress={() => handleMove(index)}>
      <View
        className={`px-4 py-2 rounded-3xl ${
          isChecked ? "bg-primary" : "border border-gray-400"
        }`}
      >
        <Text className={`${isChecked ? "text-foreground" : "text-gray-400"}`}>
          {title}
        </Text>
      </View>
    </Pressable>
  );
}
