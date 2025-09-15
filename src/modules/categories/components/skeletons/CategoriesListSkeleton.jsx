import { View } from "react-native";
import CategoryCardSkeleton from "./CategoryCardSkeleton";

export default function CategoriesListSkeleton() {
  const categories = Array.from({ length: 6 }, (_, i) => ({
    id: i,
  }));

  return (
    <View>
      <View className="flex flex-row flex-wrap">
        {categories.map((category) => (
          <View key={category.id} className="w-1/3">
            <CategoryCardSkeleton />
          </View>
        ))}
      </View>
    </View>
  );
}
