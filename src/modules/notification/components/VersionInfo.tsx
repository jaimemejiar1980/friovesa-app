import { View, Text } from "react-native";
import lang from "../../../lang/es";

export function VersionInfo({
  latestVersion,
  installedVersion,
}: {
  latestVersion: string;
  installedVersion: string;
}) {
  return (
    <View className="space-y-2">
      <View>
        <Text className="text-copy-light text-base">
          {lang?.appNewAvailableVersion}: {latestVersion}
        </Text>
        <Text className="text-copy-light text-base">
          {lang?.appInstalledVersion}: {installedVersion}
        </Text>
      </View>
    </View>
  );
}
