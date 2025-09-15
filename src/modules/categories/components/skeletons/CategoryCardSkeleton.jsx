import { Shimmer, Card } from "../../../common";
import { View } from "react-native";

export default function CategoryCardSkeleton() {
  return (
    <Card additionalStyles="h-36 md:h-48">
      <View className="h-full w-full">
        <View className="p-2 flex flex-col justify-center items-center space-y-2 h-full w-full">
          <View className="mx-auto">
            <View className="h-20 w-20 md:w-28 md:h-28 overflow-hidden rounded-full">
              <Shimmer />
            </View>
          </View>

          <View className="flex flex-row justify-center">
            <View className="h-3 w-4/5 md:w-2/5 overflow-hidden rounded-sm">
              <Shimmer />
            </View>
          </View>
        </View>
      </View>
    </Card>
  );
}
