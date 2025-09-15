import { Redirect } from "expo-router";
import {
  useAppAvailabilityNotification,
  useAppVersionNotification,
} from "../src/modules/notification";
import { useAuth } from "../src/modules/auth";
import AppLoadingScreen from "../src/screens/AppLoadingScreen";

export default function index() {
  const { isLoading: isAppAvailableLoading, isAppAvailable } =
    useAppAvailabilityNotification();

  const { isValidatingAppVersion, forceAppToUpdate } =
    useAppVersionNotification();

  const { isLogged, isLoading } = useAuth();
  console.log("🚀 ~ index ~ { isLogged, isLoading }:", {
    isLogged,
    isLoading,
  });

  const showLoadingScreen =
    isAppAvailableLoading || isValidatingAppVersion || isLoading;

  return (
    <>
      {!showLoadingScreen && !isAppAvailable && (
        <Redirect href="appAvailability" />
      )}

      {!showLoadingScreen && forceAppToUpdate && <Redirect href="update" />}

      {!showLoadingScreen && !isLogged && <Redirect href="(auth)/login" />}

      {!showLoadingScreen && isLogged && <Redirect href="(tabs)/home" />}

      <AppLoadingScreen />
    </>
  );
}
