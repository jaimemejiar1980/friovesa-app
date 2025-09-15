import { ScrollView, View } from "react-native";
import OrderCardSkeleton from "./OrderCardSkeleton";

export default function OrdersListSkeleton() {
  const products = Array.from({ length: 4 }, (_, i) => ({
    id: i,
  }));

  return (
    <ScrollView>
      <View className="flex flex-col">
        {products.map((product) => (
          <View key={product.id}>
            <OrderCardSkeleton />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
