import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { TermsAndConditionsScreen } from "@/screens/Info";
import { View } from "react-native";
import lang from "@/lang/es";

export default function TermsAndConditions() {
  return (
    <SafeAreaView className="bg-background h-full">
      <TermsAndConditionsScreen />

      <View className="flex flex-col items-center py-3">
        <Link className="text-secondary text-base" href="../">
          {lang.goBack}
        </Link>
      </View>
    </SafeAreaView>
  );
}
