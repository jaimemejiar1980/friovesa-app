import { CheckoutProvider } from "../../../../src/modules/checkout";
import { OrderDetailHeader } from "../../../../src/modules/common";
import { Stack } from "expo-router";

export default function CartLayout() {
  return (
    <CheckoutProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="checkout"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="OrderDetail"
          options={{
            header: (props) => <OrderDetailHeader goBackPath="(tabs)/home" />,
          }}
        />
      </Stack>
    </CheckoutProvider>
  );
}
