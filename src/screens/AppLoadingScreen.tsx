import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { APP_COLORS, appIcon } from "@/constants";
import { CustomSafeAreaView } from "@/modules/common";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { View, Text } from "react-native";

export default function AppLoadingScreen({ title }: { title: string }) {
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withRepeat(
      withTiming(1.1, { duration: 2000, easing: Easing.ease }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <CustomSafeAreaView>
      <View className="h-full flex flex-col justify-center items-center">
        <Animated.View style={[animatedStyle]}>
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
        </Animated.View>
        {title && (
          <Text className="text-2xl text-primary font-bold ">{title}</Text>
        )}
      </View>

      <StatusBar style="dark" />
    </CustomSafeAreaView>
  );
}
