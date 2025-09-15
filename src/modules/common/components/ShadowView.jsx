import { View, Platform } from "react-native";

export default function ShadowView({ children, extraStyles }) {
  const isIos = Platform.OS === "ios";

  return isIos ? (
    <View className={`shadow-sm bg-slate-50 shadow-black/20 ${extraStyles}`}>
      {children}
    </View>
  ) : (
    <View className={`shadow-sm bg-slate-50 shadow-black ${extraStyles}`}>
      {children}
    </View>
  );
}
