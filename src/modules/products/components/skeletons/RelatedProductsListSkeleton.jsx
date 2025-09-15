import { ScrollView, View } from "react-native";
import ProductCardSkeleton from "./ProductCardSkeleton";

export default function RelatedProductsListSkeleton() {
  const items = Array.from({ length: 2 }, (_, i) => ({
    id: i,
  }));

  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View className="flex flex-row">
        {items.map((product) => (
          <View key={product.id} className="w-44">
            <ProductCardSkeleton />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
