import {
  ControlButtonCancel,
  ControlButtonSuccess,
  CustomModal,
} from "../../common";
import { FeatureList } from "./FeatureList";
import { Text, View } from "react-native";
import { useAppVersionNotification } from "../hooks";
import { useState } from "react";
import { VersionInfo } from "./VersionInfo";
import lang from "../../../lang/es";

export function AppVersionNotificationModal() {
  const { goToStore, appVersionInfo, isUpdateAvailable } =
    useAppVersionNotification();
  const [isOpen, setIsOpen] = useState(isUpdateAvailable ?? false);
  const { latestVersion, installedVersion, notes, features } = appVersionInfo;

  return (
    <CustomModal isOpen={isOpen}>
      <View className="bg-white w-11/12 p-4 rounded-md space-y-5">
        <Text className="text-xl font-bold text-primary text-center">
          {lang?.updateIsAvailable}
        </Text>

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

          <View className="md:w-6/12 md:pr-2 pt-2 md:pt-0">
            <ControlButtonCancel
              title={lang?.continueWithoutUpdate}
              handlePress={() => setIsOpen(false)}
            />
          </View>
        </View>
      </View>
    </CustomModal>
  );
}
