import { View } from "react-native";
import PaymentMethodSkeleton from "./PaymentMethodSkeleton";

export default function PaymentMethodListSkeleton() {
  return (
    <View className="space-y-4">
      <View>
        <PaymentMethodSkeleton showImage={false} />
      </View>

      <View>
        <PaymentMethodSkeleton />
      </View>
    </View>
  );
}
