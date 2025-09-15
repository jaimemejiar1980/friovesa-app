import { Shimmer } from "../../../common";
import { View } from "react-native";

export function BundledProductDetailsInfoSkeleton() {
  return (
    <View className="space-y-3">
      <View className="w-full flex-row">
        <View className="w-1/2 h-8 rounded-md overflow-hidden">
          <Shimmer />
        </View>

        <View className="w-1/2 h-8 pl-2">
          <View className="rounded-md overflow-hidden">
            <Shimmer />
          </View>
        </View>
      </View>
    </View>
  );
}
