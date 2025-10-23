import { OrderHistoryProvider } from "../../../../src/modules/order";
import { Stack } from "expo-router";
import { TabsHeader } from "../../../../src/modules/common";
import lang from "../../../../src/lang/es";
import { Platform } from "react-native";

export default function SettingsLayout() {
  const devicePlatform = Platform.OS;
  const isIos = devicePlatform === "ios";

  return (
    <OrderHistoryProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
            animation: isIos ? "slide_from_left" : "default",
          }}
        />
        <Stack.Screen
          name="affiliate"
          options={{
            header: (props) => <TabsHeader title="" />,
          }}
        />
        <Stack.Screen
          name="aboutUs"
          options={{
            header: (props) => <TabsHeader title="" />,
          }}
        />
        <Stack.Screen
          name="termsAndConditions"
          options={{
            header: (props) => <TabsHeader title="" />,
          }}
        />
        <Stack.Screen
          name="privacyPolicy"
          options={{
            header: (props) => <TabsHeader title="" />,
          }}
        />
        <Stack.Screen
          name="ordersHistory"
          options={{
            title: lang?.ordersHistory,
            header: (props) => <TabsHeader title={props?.options?.title} />,
          }}
        />
        <Stack.Screen
          name="orderHistory/[id]"
          options={{
            title: lang?.orderDetail,
            header: (props) => <TabsHeader title={props?.options?.title} />,
          }}
        />
      </Stack>
    </OrderHistoryProvider>
  );
}
