import { View, Text } from "react-native";
import lang from "../../../lang/es";

export default function OrderTotals({ order }) {
  const {
    paymentMethodTitle,
    shippingMethod,
    shippingTotal,
    subtotal,
    totalTax,
    total,
  } = order;
  
  return (
    <View>
      <View className="mb-4 space-y-1 bg-gray-200 rounded-md p-3 md:p-4">
        <View className="w-full flex flex-wrap flex-row justify-between">
          <Text className="text-base">{lang?.paymentMethod}:</Text>

          <Text className="text-base font-bold">{paymentMethodTitle}</Text>
        </View>

        <View className="w-full flex flex-wrap flex-row justify-between">
          <Text className="text-base">{lang?.shippingMethod}:</Text>

          <Text className="text-base font-bold">{shippingMethod}</Text>
        </View>

        <View className="w-full flex flex-wrap flex-row justify-between">
          <Text className="text-base">{lang.shipping}:</Text>

          <Text className="text-base font-bold">{shippingTotal}</Text>
        </View>

        <View className="w-full flex flex-wrap flex-row justify-between">
          <Text className="text-base">{lang.subtotal}:</Text>

          <Text className="text-base font-bold">{subtotal}</Text>
        </View>

        <View className="w-full flex flex-wrap flex-row justify-between">
          <Text className="text-base">{lang?.totalTax}:</Text>

          <Text className="text-base font-bold">{totalTax}</Text>
        </View>

        <View className="py-1">
          <View className="h-[1px] bg-gray-300" />
        </View>

        <View className="w-full flex flex-wrap flex-row justify-between">
          <Text className="text-lg text-secondary font-bold">{lang.total}</Text>

          <Text className="text-lg font-bold">{total}</Text>
        </View>
      </View>
    </View>
  );
}
