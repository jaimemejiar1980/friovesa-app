import { Card, Shimmer } from "../../../common";
import { View } from "react-native";

export default function OrderCardSkeleton() {
  return (
    <Card additionalStyles="p-3 space-y-2">
      <View className="flex flex-row">
        <View className="w-3/12 h-20 md:h-28 rounded-sm overflow-hidden">
          <Shimmer />
        </View>

        <View className="w-9/12 flex flex-col space-y-5 pl-4">
          <View className="flex flex-col space-y-1">
            <View className="h-5 rounded-sm overflow-hidden">
              <Shimmer />
            </View>

            <View className="w-7/12 h-4 rounded-sm overflow-hidden">
              <Shimmer />
            </View>
          </View>

          <View className="space-y-1">
            <View className="flex flex-row justify-between">
              <View className="w-6/12 h-4 rounded-sm overflow-hidden pr-1">
                <Shimmer />
              </View>

              <View className="w-4/12 h-4 rounded-sm overflow-hidden pl-1">
                <Shimmer />
              </View>
            </View>

            <View className="flex flex-row justify-between">
              <View className="w-6/12 h-4 rounded-sm overflow-hidden pr-1">
                <Shimmer />
              </View>

              <View className="w-5/12 h-4 rounded-sm overflow-hidden pl-1">
                <Shimmer />
              </View>
            </View>
          </View>
        </View>
      </View>

      <View className="bg-gray-100 flex flex-row justify-between px-1 rounded-md pt-1 pb-2 md:pt-2 mb:pb-3">
        <View className="w-4/12 flex flex-col space-y-3">
          <View className="w-7/12 h-3 rounded-sm overflow-hidden mx-auto">
            <Shimmer />
          </View>

          <View className="w-7/12 h-3 rounded-sm overflow-hidden mx-auto">
            <Shimmer />
          </View>
        </View>

        <View className="w-4/12 flex flex-col space-y-3">
          <View className="w-7/12 h-3 rounded-sm overflow-hidden mx-auto">
            <Shimmer />
          </View>

          <View className="w-7/12 h-3 rounded-sm overflow-hidden mx-auto">
            <Shimmer />
          </View>
        </View>

        <View className="w-4/12 flex flex-col space-y-3">
          <View className="w-7/12 h-3 rounded-sm overflow-hidden mx-auto">
            <Shimmer />
          </View>

          <View className="w-7/12 h-3 rounded-sm overflow-hidden mx-auto">
            <Shimmer />
          </View>
        </View>
      </View>
    </Card>
  );
}
