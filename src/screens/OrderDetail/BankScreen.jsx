import {
  ControlButtonSuccess,
  CustomSafeAreaView,
  ListContainer,
} from "../../modules/common";
import {
  DirectTransferGateway,
  OrderedProductSectionTitle,
  PaymentInstructions,
  useCheckout,
} from "../../modules/checkout";
import { OrderTotals, OrderedProduct } from "../../modules/order";
import { router } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";
import { useCart } from "../../modules/cart";
import { useEffect } from "react";
import { View, Text } from "react-native";
import lang from "../../lang/es";

export default function BankScreen() {
  const { clearCart } = useCart();
  const { createdOrder, paymentMethod } = useCheckout();
  const { order, payment } = createdOrder;

  const orderTotals = {
    paymentMethodTitle: order?.paymentMethodTitle,
    shippingMethod: order?.shippingMethod,
    shippingTotal: order?.shippingTotal,
    subtotal: order?.subtotal,
    totalTax: order?.totalTax,
    total: order?.total,
  };
  const date = new Date(order?.dateCreated).toLocaleDateString("es-ec", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const time = new Date(order?.dateCreated).toLocaleTimeString("es-ec", {
    hour: "2-digit",
    minute: "2-digit",
  });

  useEffect(() => {
    clearCart();
  }, [createdOrder]);

  const handleGoToHome = () => {
    router.back();
    router.replace("(drawer)/(tabs)/home");
  };

  return (
    <CustomSafeAreaView>
      <ScrollView className="p-2 space-y-2">
        <ListContainer>
          <View className="pt-3">
            <OrderedProductSectionTitle title={lang?.ourBankingData} />
          </View>

          <DirectTransferGateway bankInfo={payment} />

          <View className="pt-3">
            <OrderedProductSectionTitle title={lang?.paymentInstructions} />
          </View>

          <View className="space-y-2">
            <Text className="text-base pt-4">
              {lang?.transferenceInstructions}
            </Text>

            <View className="h-44">
              <PaymentInstructions instructions={paymentMethod.instructions} />
            </View>
          </View>

          <View className="pt-3">
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
              <Text className="text-base font-bold">{lang?.orderSent}</Text>

              <View className="flex flex-row justify-between">
                <Text className="text-lg">{lang?.orderNumber}:</Text>

                <Text className="text-lg font-bold"># {order?.id}</Text>
              </View>
            </View>
          </View>

          <View className="pt-3">
            <OrderedProductSectionTitle title={lang?.orderDetail} />
          </View>
          <View className="pt-1 pb-5 space-y-2">
            <View>
              {order?.products?.map((item, index) => (
                <OrderedProduct key={index} product={item} />
              ))}
            </View>

            <View>
              <OrderTotals order={orderTotals} />
            </View>

            <View className="pt-3">
              <ControlButtonSuccess
                title={lang?.backToShopping}
                handlePress={handleGoToHome}
              />
            </View>
          </View>
        </ListContainer>
      </ScrollView>
    </CustomSafeAreaView>
  );
}
