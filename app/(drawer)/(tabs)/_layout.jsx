import { APP_COLORS } from "../../../src/constants/colors";
import { Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  TabBarIcon,
  TabBarIconCart,
  TabBarIconLabel,
} from "../../../src/modules/common";
import { Tabs } from "expo-router";
import {
  uioIcon,
  gyeIcon,
  homeIcon,
  cartIcon,
  userIcon,
} from "../../../src/constants/icons";
import lang from "../../../src/lang/es";

export default function TabLayout() {
  const iosTabBarStyle = {
    backgroundColor: APP_COLORS.primary,
  };

  const androidTabBarStyle = {
    backgroundColor: APP_COLORS.primary,
    height: 60,
  };

  const isIos = Platform.OS === "ios";

  return (
    <>
      <Tabs
        initialRouteName="home"
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarActiveTintColor: APP_COLORS.secondary,
          tabBarInactiveTintColor: APP_COLORS.foreground,
          tabBarStyle: isIos ? iosTabBarStyle : androidTabBarStyle,
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "",
            tabBarIcon: ({ color }) => (
              <TabBarIcon icon={homeIcon} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="Uio"
          options={{
            title: "",
            tabBarIcon: ({ color }) => (
              <TabBarIconLabel icon={uioIcon} title={lang.uio} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="Cart"
          options={{
            title: "",
            tabBarIcon: () => <TabBarIconCart icon={cartIcon} />,
          }}
        />
        <Tabs.Screen
          name="Gye"
          options={{
            title: "",
            tabBarIcon: ({ color }) => (
              <TabBarIconLabel icon={gyeIcon} title={lang.gye} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="Settings"
          options={{
            title: "",
            tabBarIcon: ({ color }) => (
              <TabBarIcon icon={userIcon} color={color} />
            ),
          }}
        />
      </Tabs>

      <StatusBar style="light" />
    </>
  );
}
