import {
  ControlButtonSuccess,
  CustomSafeAreaView,
  ListContainer,
} from "../../../../../src/modules/common";
import {
  OrderedProduct,
  OrderTotals,
  useOrderHistory,
} from "../../../../../src/modules/order";
import { OrderedProductSectionTitle } from "../../../../../src/modules/checkout";
import { router } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import lang from "../../../../../src/lang/es";

export default function OrderHistory() {
  const { orderHistory } = useOrderHistory();

  const orderTotals = {
    paymentMethodTitle: orderHistory?.paymentMethodTitle,
    shippingMethod: orderHistory?.shippingMethod,
    shippingTotal: orderHistory?.shippingTotal,
    subtotal: orderHistory?.subtotal,
    totalTax: orderHistory?.totalTax,
    total: orderHistory?.total,
  };
  const date = new Date(orderHistory?.dateCreated).toLocaleDateString("es-ec", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const time = new Date(orderHistory?.dateCreated).toLocaleTimeString("es-ec", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleReturnToOrdersHistory = () => {
    router.back();
  };

  return (
    <CustomSafeAreaView>
      <ScrollView className="p-2 space-y-2">
        <ListContainer>
          <View>
            <View className="flex flex-row space-x-2 justify-end">
              <Text className="text-base text-copy-light capitalize">
                {date}
              </Text>

              <Text className="text-base text-copy-light capitalize">|</Text>

              <Text className="text-base text-copy-light capitalize">
                {time}
              </Text>
            </View>

            <View className="bg-gray-200 rounded-md p-3">
              <View className="flex flex-row justify-between">
                <Text className="text-lg">{lang?.orderNumber}:</Text>

                <Text className="text-lg font-bold"># {orderHistory?.id}</Text>
              </View>

              <View className="flex flex-row justify-between">
                <Text className="text-lg">{lang?.state}:</Text>

                <Text className="text-lg font-bold">
                  {orderHistory?.status}
                </Text>
              </View>
            </View>
          </View>

          <View className="pt-3">
            <OrderedProductSectionTitle title={lang?.orderDetail} />
          </View>

          <View className="pt-1 pb-5 space-y-2">
            <View>
              {orderHistory?.products?.map((item, index) => (
                <OrderedProduct key={index} product={item} />
              ))}
            </View>

            <View>
              <OrderTotals order={orderTotals} />
            </View>

            <View className="pt-3">
              <ControlButtonSuccess
                title={lang?.returnToOrdersHistory}
                handlePress={handleReturnToOrdersHistory}
              />
            </View>
          </View>
        </ListContainer>
      </ScrollView>
    </CustomSafeAreaView>
  );
}
