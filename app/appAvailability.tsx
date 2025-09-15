import { APP_EXTERNAL_LINKS } from "@/constants";
import { ControlButtonSuccess } from "@/modules/common";
import {
  NotificationScreenWrapper,
  useAppAvailabilityNotification,
} from "@/modules/notification";
import { StatusBar } from "expo-status-bar";
import { Linking, Text, View } from "react-native";
import lang from "@/lang/es";

export default function appAvailability() {
  const { appAvailabilityInfo } = useAppAvailabilityNotification();

  const subtitle = appAvailabilityInfo?.subtitle?.trim() || lang?.important;
  const description =
    appAvailabilityInfo?.description?.trim() ||
    lang?.defaultAvailabilityDescription;
  const url =
    appAvailabilityInfo?.webUrl?.trim() || APP_EXTERNAL_LINKS.APP_WEB.DEFAULT;

  const handleGoToWeb = () => {
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        }
      })
      .catch((error) => {
        console.log("🚀 ~ handleGoToWeb ~ error:", error);
      });
  };

  return (
    <NotificationScreenWrapper screeTitle={subtitle}>
      <Text className="text-base">{description}</Text>

      <View className="space-y-2">
        <View>
          <ControlButtonSuccess
            title={lang?.goToWeb}
            handlePress={handleGoToWeb}
          />
        </View>
      </View>

      <StatusBar style="dark" />
    </NotificationScreenWrapper>
  );
}
