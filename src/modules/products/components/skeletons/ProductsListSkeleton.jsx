import { ScrollView, View } from "react-native";
import ProductCardSkeleton from "./ProductCardSkeleton";

export default function ProductsListSkeleton() {
  const products = Array.from({ length: 6 }, (_, i) => ({
    id: i,
  }));

  return (
    <ScrollView>
      <View className="flex flex-row flex-wrap">
        {products.map((product) => (
          <View key={product.id} className="w-1/2 md:w-4/12">
            <ProductCardSkeleton />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
