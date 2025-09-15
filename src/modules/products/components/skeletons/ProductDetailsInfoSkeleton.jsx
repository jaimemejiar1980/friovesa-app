import { Shimmer } from "../../../common";
import { View } from "react-native";

export default function ProductDetailsInfoSkeleton() {
  return (
    <View className="space-y-5">
      <View className="h-7 rounded-md overflow-hidden w-20">
        <Shimmer />
      </View>

      <View>
        <View className="flex flex-row flex-wrap space-x-2">
          <View className="h-3 w-16 rounded-md overflow-hidden">
            <Shimmer />
          </View>

          <View className="h-3 w-24 rounded-md overflow-hidden">
            <Shimmer />
          </View>
        </View>

        <View className="flex flex-row flex-wrap space-x-2 mt-2">
          <View className="h-3 w-24 rounded-md overflow-hidden">
            <Shimmer />
          </View>

          <View className="h-3 w-32 rounded-md overflow-hidden">
            <Shimmer />
          </View>
        </View>
      </View>

      <View className="space-y-3">
        <View className="w-full flex-row">
          <View className="w-1/2 h-8 rounded-md overflow-hidden">
            <Shimmer />
          </View>

          <View className="w-1/2 pl-2 h-8">
            <View className="rounded-md overflow-hidden">
              <Shimmer />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
