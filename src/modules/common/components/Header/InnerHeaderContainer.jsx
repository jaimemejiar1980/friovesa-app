import { View } from "react-native";

export function InnerHeaderContainer({ children }) {
  return (
    <View className="h-12 py-1 px-2 flex flex-row items-center text-base bg-background">
      {children}
    </View>
  );
}
