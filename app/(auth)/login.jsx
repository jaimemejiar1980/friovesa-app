import { APP_COLORS } from "../../src/constants/colors";
import { appIcon } from "../../src/constants/icons";
import {
  AppleSignIn,
  GoogleSignIn,
  SimpleSignIn,
} from "../../src/modules/auth";
import { Dimensions, Platform, Text, View } from "react-native";
import { Image } from "expo-image";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import lang from "../../src/lang/es";

export default function Login() {
  const isIos = Platform.OS === "ios";

  return (
    <SafeAreaView className="bg-background h-full px-4">
      <View style={{ flex: 1, height: Dimensions.get("window").height }}>
        <KeyboardAwareScrollView
          extraHeight={50}
          style={{
            flex: 1,
          }}
          className="space-y-16"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        >
          <View className="w-full py-8">
            <Image
              source={appIcon}
              className="w-32 h-32 mx-auto"
              style={{ tintColor: APP_COLORS.primary }}
            />

            <Text className="text-center text-2xl font-bold text-primary">
              {lang?.enterToApp} {lang?.appName}
            </Text>
          </View>

          <View className="space-y-3 mb-4 mx-auto">
            <View>
              <GoogleSignIn />
            </View>

            {isIos && (
              <View>
                <AppleSignIn />
              </View>
            )}

            <View style={{ width: 280 }}>
              <SimpleSignIn />
            </View>

            <View className="flex flex-row justify-center h-20">
              <Text className="text-base">{lang?.dontHaveAccount} </Text>

              <Link href="/signup">
                <Text className="text-secondary text-base font-bold">
                  {lang?.signUp}
                </Text>
              </Link>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
}
