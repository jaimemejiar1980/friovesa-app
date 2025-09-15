import { ScrollView, View } from "react-native";
import { ShadowView, Shimmer } from "../../../common";

export default function CategoriesScrollableMenuSkeleton() {
  const items = Array.from({ length: 5 }, (_, i) => ({
    id: i,
  }));

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View className="flex flex-row space-x-5 p-2 h-20 md:h-32">
        {items.map((item) => (
          <View key={item.id}>
            <ShadowView extraStyles="flex flex-col space-y-2 items-center bg-gray-50 py-1 px-2 md:py-2 md:px-4 rounded-md">
              <View className="h-10 w-10 md:h-16 md:w-16 overflow-hidden rounded-sm">
                <Shimmer />
              </View>

              <View className="h-[10px] md:h-[12px] w-16 md:w-20 rounded-sm overflow-hidden">
                <Shimmer />
              </View>
            </ShadowView>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
