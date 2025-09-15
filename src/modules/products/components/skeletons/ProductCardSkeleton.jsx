import { Shimmer, Card } from "../../../common";
import { View } from "react-native";

export default function ProductCardSkeleton() {
  return (
    <Card additionalStyles="h-48 md:h-60">
      <View className="h-full w-full">
        <View className="h-28 md:h-36 w-full rounded-t-md overflow-hidden">
          <Shimmer />
        </View>

        <View className="p-2 space-y-2">
          <View className="h-3 w-full overflow-hidden rounded-sm">
            <Shimmer />
          </View>

          <View className="h-4 w-2/5 overflow-hidden rounded-sm">
            <Shimmer />
          </View>

          <View className="h-3 w-2/5 overflow-hidden rounded-sm">
            <Shimmer />
          </View>
        </View>
      </View>
    </Card>
  );
}
