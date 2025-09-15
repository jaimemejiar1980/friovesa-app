import { ControlButtonSuccess } from "@/modules/common";
import {
  FeatureList,
  useAppVersionNotification,
  VersionInfo,
  NotificationScreenWrapper,
} from "@/modules/notification";
import { StatusBar } from "expo-status-bar";
import { View, Text } from "react-native";
import lang from "@/lang/es";

export default function update() {
  const { goToStore, appVersionInfo } = useAppVersionNotification();
  const { latestVersion, installedVersion, notes, features } = appVersionInfo;

  return (
    <NotificationScreenWrapper screeTitle={lang?.updateIsRequired}>
      <View className="space-y-5">
        <Text className="text-base">{notes}</Text>

        {features && features?.length > 0 && (
          <View>
            <FeatureList features={features} />
          </View>
        )}

        <View>
          <VersionInfo
            latestVersion={latestVersion}
            installedVersion={installedVersion}
          />
        </View>
      </View>

      <View className="md:flex md:flex-row-reverse">
        <View className="md:w-6/12 md:pl-2">
          <ControlButtonSuccess
            title={lang?.goToStore}
            handlePress={goToStore}
          />
        </View>
      </View>

      <StatusBar style="dark" />
    </NotificationScreenWrapper>
  );
}
