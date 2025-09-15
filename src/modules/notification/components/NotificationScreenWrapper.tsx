import { APP_COLORS, appIcon } from "@/constants";
import { CustomSafeAreaView } from "@/modules/common";
import { Image } from "expo-image";
import { View, Text, Dimensions, ScrollView } from "react-native";
import React from "react";

interface NotificationScreenWrapperProps {
  children: React.ReactNode;
  screeTitle?: string;
}

export function NotificationScreenWrapper({
  children,
  screeTitle,
}: NotificationScreenWrapperProps) {
  return (
    <CustomSafeAreaView>
      <View style={{ flex: 1, height: Dimensions.get("window").height }}>
        <ScrollView
          style={{
            flex: 1,
          }}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
          }}
        >
          <View className="py-4 px-8 space-y-10 flex flex-col">
            <View>
              <View className="mx-auto">
                <View className="h-28 w-28 md:w-40 md:h-40">
                  <Image
                    source={appIcon}
                    style={{
                      tintColor: APP_COLORS.primary,
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </View>
              </View>

              {screeTitle && (
                <Text className="text-xl font-bold text-primary text-center">
                  {screeTitle}
                </Text>
              )}
            </View>

            {children}
          </View>
        </ScrollView>
      </View>
    </CustomSafeAreaView>
  );
}
