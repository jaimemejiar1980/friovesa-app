import { APP_COLORS } from "../../../src/constants/colors";
import { Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  TabBarIcon,
  TabBarIconCart,
  TabBarIconLabel,
  TouchableSettings,
} from "../../../src/modules/common";
import { Tabs, useRouter } from "expo-router";
import {
  uioIcon,
  gyeIcon,
  homeIcon,
  cartIcon,
  userIcon,
  clockIcon,
  searchIcon,
} from "../../../src/constants/icons";
import lang from "../../../src/lang/es";
import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from "react-native";

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
              <TabBarIcon icon={uioIcon} color={color} />
            ),
            tabBarButton: () => null,
          }} 
        />
        <Tabs.Screen
            name="Gye"
            options={{
              tabBarIcon: ({ color }) => (
                <TabBarIcon icon={gyeIcon} color={color} />
              ),
              tabBarButton: () => null,
          }} 
        />
        <Tabs.Screen
          name="Stores/index" 
          options={{
            title: "",
            tabBarIcon: ({ color }) => (
              <TabBarIcon icon={searchIcon}  color={color} />
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
          name="Historial/index" 
          options={{
            title: "",
            tabBarIcon: ({ color }) => (
              <TabBarIcon icon={clockIcon}  color={color} />
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
