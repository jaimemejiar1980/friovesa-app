import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function AuthLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="login"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen name="privacyPolicy" options={{ headerShown: false }} />
        <Stack.Screen
          name="termsAndConditions"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="oauthredirect" options={{ headerShown: false }} />
      </Stack>

      <StatusBar style="dark" />
    </>
  );
}
