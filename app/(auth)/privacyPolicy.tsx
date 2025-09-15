import { Link } from "expo-router";
import { PrivacyPolicyScreen } from "@/screens/Info";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import lang from "@/lang/es";

export default function PrivacyPolicy() {
  return (
    <SafeAreaView className="bg-background h-full">
      <PrivacyPolicyScreen />

      <View className="flex flex-col items-center py-3">
        <Link className="text-secondary text-base" href="../">
          {lang.goBack}
        </Link>
      </View>
    </SafeAreaView>
  );
}
