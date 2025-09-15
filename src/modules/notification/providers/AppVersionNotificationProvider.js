import { AppVersionNotificationContext } from "../context";
import { Linking, Platform } from "react-native";
import { NotificationService } from "../services";
import { STORE_LINKS } from "../../../constants/wordpress";
import { useEffect, useState } from "react";
import * as Application from "expo-application";
import semver from "semver";

export function AppNotificationProvider({ children }) {
  const installedVersion = Application.nativeApplicationVersion;
  const devicePlatform = Platform.OS;
  const isIos = devicePlatform === "ios";

  const notificationService = new NotificationService();

  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);
  const [forceAppToUpdate, setForceAppToUpdate] = useState(false);
  const [isValidatingAppVersion, setIsValidatingAppVersion] = useState(true);
  const [appVersionInfo, setAppVersionInfo] = useState(null);

  useEffect(() => {
    const setupVersionInfo = async () => {
      try {
        setIsValidatingAppVersion(true);
        let versionInfo;
        if (isIos) {
          versionInfo = await notificationService.getIosAppVersion();
        } else {
          versionInfo = await notificationService.getAndroidAppVersion();
        }

        setAppVersionInfo({ ...versionInfo, installedVersion });
        handleVersionNotification({
          isLatestVersionEnabled: versionInfo?.enabled,
          latestVersion: versionInfo?.latestVersion,
          minSupportedVersion: versionInfo?.minSupportedVersion,
        });
      } catch (error) {
        console.log("🚀 ~ setupVersionInfo ~ error:", error);
        setForceAppToUpdate(false);
        setIsUpdateAvailable(false);
      } finally {
        setIsValidatingAppVersion(false);
      }
    };

    setupVersionInfo();
  }, []);

  const handleVersionNotification = ({
    latestVersion,
    minSupportedVersion,
    isLatestVersionEnabled,
  }) => {
    /**
     * If the safeguard (isLatestVersionEnabled) is disabled, skip the update process.
     * This avoids unnecessary checks and ensures users are not blocked due to bugs or misconfigurations.
     */
    if (!isLatestVersionEnabled) {
      setForceAppToUpdate(false);
      setIsUpdateAvailable(false);
      return;
    }

    /**
     * Validate the version strings using semantic versioning (semver).
     * If any of the versions (installed, latest, or minimum supported) are invalid,
     * skip the update process to prevent errors caused by malformed version data.
     */
    if (
      !semver.valid(installedVersion) ||
      !semver.valid(latestVersion) ||
      !semver.valid(minSupportedVersion)
    ) {
      setForceAppToUpdate(false);
      setIsUpdateAvailable(false);
      return;
    }

    /**
     * Check if the installed version is lower than the latest version available.
     * If true, notify the user about the availability of an update.
     */
    if (semver.lt(installedVersion, latestVersion)) {
      setIsUpdateAvailable(true);
    }

    /**
     * Check if the installed version is lower than the minimum supported version.
     * If true, enforce the update to ensure the app remains functional and compatible.
     */
    if (semver.lt(installedVersion, minSupportedVersion)) {
      setForceAppToUpdate(true);
    }
  };

  const goToStore = () => {
    let url = "";
    if (isIos) {
      url = STORE_LINKS.APP_STORE;
    } else {
      url = STORE_LINKS.GOOGLE_PLAY;
    }

    Linking.openURL(url);
  };

  return (
    <AppVersionNotificationContext.Provider
      value={{
        appVersionInfo,
        forceAppToUpdate,
        devicePlatform,
        isValidatingAppVersion,
        isUpdateAvailable,
        goToStore,
      }}
    >
      {children}
    </AppVersionNotificationContext.Provider>
  );
}
