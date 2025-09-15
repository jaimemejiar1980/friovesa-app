import { Platform, SafeAreaView } from "react-native";
import { SafeAreaView as AndroidSafeAreaView } from "react-native-safe-area-context";

export function AppHeaderContainer({ children }) {
  const isIos = Platform.OS === "ios";
  return isIos ? (
    <SafeAreaView className="bg-primary px-3">{children}</SafeAreaView>
  ) : (
    <AndroidSafeAreaView className="bg-primary px-2">
      {children}
    </AndroidSafeAreaView>
  );
}
