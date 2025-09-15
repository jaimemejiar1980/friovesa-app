import "react-native-gesture-handler";
import { APP_COLORS } from "../src/constants/colors";
import { AppState } from "react-native";
import { AuthProvider } from "../src/modules/auth";
import {
  AppNotificationProvider,
  AppAvailabilityNotificationProvider,
} from "../src/modules/notification";
import { CustomToast, GlobalLoadingModalProvider } from "../src/modules/common";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { requestTrackingPermissionsAsync } from "expo-tracking-transparency";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef } from "react";
import { useFonts } from "expo-font";

const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const appState = useRef(AppState.currentState);
  const [fontsLoaded, fontsError] = useFonts({
    "Roboto-Regular": require("../src/assets/fonts/Roboto-Regular.ttf"),
    "Raleway-Regular": require("../src/assets/fonts/Raleway-Regular.ttf"),
  });

  useEffect(() => {
    const checkGrantedPermission = async () => {
      const { granted } = await requestTrackingPermissionsAsync();
      if (granted) {
        console.log("✅ Users has granted permission to track");
      }
    };

    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === "active") {
        checkGrantedPermission();
      }

      appState.current = nextAppState;
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    if (fontsLoaded || fontsError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontsError]);

  if (!fontsLoaded && !fontsError) return null;

  return (
    <>
      <AppAvailabilityNotificationProvider>
        <AppNotificationProvider>
          <AuthProvider>
            <GlobalLoadingModalProvider>
              <QueryClientProvider client={queryClient}>
                <Stack
                  initialRouteName="index"
                  screenOptions={{
                    headerTitleAlign: "center",
                    headerStyle: {
                      backgroundColor: APP_COLORS.primary,
                    },
                    headerTitleStyle: {
                      color: APP_COLORS.foreground,
                    },
                  }}
                >
                  <Stack.Screen
                    name="(drawer)"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="(auth)"
                    options={{
                      headerShown: false,
                      animation: "fade",
                    }}
                  />
                  <Stack.Screen
                    name="index"
                    options={{
                      headerShown: false,
                      animation: "fade",
                    }}
                  />
                  <Stack.Screen
                    name="update"
                    options={{
                      headerShown: false,
                      animation: "fade",
                    }}
                  />
                  <Stack.Screen
                    name="appAvailability"
                    options={{
                      headerShown: false,
                      animation: "fade",
                    }}
                  />
                </Stack>

                <StatusBar style="light" />
              </QueryClientProvider>
            </GlobalLoadingModalProvider>
          </AuthProvider>
        </AppNotificationProvider>
      </AppAvailabilityNotificationProvider>
      <CustomToast />
    </>
  );
}
