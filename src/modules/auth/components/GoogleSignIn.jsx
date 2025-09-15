import { AuthServiceResolver, GoogleSignInService } from "../services";
import { CustomError } from "../../../errors";
import { errorToast } from "../../../lib/Toast";
import {
  GOOGLE_ANDROID_CLIENT_ID,
  GOOGLE_IOS_CLIENT_ID,
} from "../../../constants/credentials";
import { googleIcon } from "../../../constants/icons";
import { Image } from "expo-image";
import { Pressable, Text, View } from "react-native";
import { router } from "expo-router";
import { signInInButtonStyles } from "./signInButtonStyles";
import { useAuth } from "../hooks";
import { useEffect } from "react";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import lang from "../../../lang/es";

WebBrowser.maybeCompleteAuthSession();

export default function GoogleSignIn() {
  const { checkIsLogged, isLogged } = useAuth();
  const [_request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: GOOGLE_ANDROID_CLIENT_ID,
    iosClientId: GOOGLE_IOS_CLIENT_ID,
  });

  useEffect(() => {
    if (!isLogged) return;
    router.replace("/home");
  }, [isLogged]);

  useEffect(() => {
    handleSignIn();
  }, [response]);

  const handleSignIn = async () => {
    try {
      if (response?.type === "success") {
        const token = response.authentication.accessToken;
        console.log("🚀 ~ handleSignIn ~ google token:", token);

        const authService = new GoogleSignInService({ accessToken: token });
        const resolver = new AuthServiceResolver(authService);
        await resolver.signIn();

        await checkIsLogged();
      }
    } catch (error) {
      console.log("🚀 ~ handleSignIn ~ error:", error);
      router.replace("/login");

      if (error instanceof CustomError) {
        errorToast({
          title: error?.message,
          slow: true,
        });
        return;
      }

      errorToast({
        title: lang?.failedToSignInWithGoogle,
        slow: true,
      });
    }
  };

  return (
    <View style={signInInButtonStyles.container}>
      <View
        style={{
          ...signInInButtonStyles.button,
          borderWidth: 0.5,
          borderRadius: 5,
        }}
      >
        <Pressable
          className="flex flex-row justify-center items-center w-full h-full"
          onPress={() => promptAsync()}
        >
          <View className="w-8 h-8 rounded-full p-2">
            <Image source={googleIcon} className="w-full h-full" />
          </View>

          <Text className="text-base font-semibold">
            {lang?.signInWithGoogle}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
