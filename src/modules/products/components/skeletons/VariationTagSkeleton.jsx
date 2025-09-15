import { Shimmer } from "../../../common";
import { View } from "react-native";

export function VariationTagSkeleton() {
  return (
    <View className="w-16 h-9 rounded-3xl overflow-hidden">
      <Shimmer />
    </View>
  );
}
