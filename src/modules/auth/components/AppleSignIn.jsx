import { AppleSignInService, AuthServiceResolver } from "../services";
import { CustomError } from "../../../errors";
import { errorToast } from "../../../lib/Toast";
import { router } from "expo-router";
import { signInInButtonStyles } from "./signInButtonStyles";
import { useAuth } from "../hooks";
import { useEffect } from "react";
import { View } from "react-native";
import * as AppleAuthentication from "expo-apple-authentication";
import lang from "../../../lang/es";

export default function AppleSignIn() {
  const { checkIsLogged, isLogged } = useAuth();

  useEffect(() => {
    if (!isLogged) return;
    router.replace("/home");
  }, [isLogged]);

  const handleSignIn = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      console.log(
        "🚀 ~ onPress ~ credential:",
        JSON.stringify(credential, null, 2)
      );
      const authorizationCode = credential.authorizationCode;
      const identityToken = credential.identityToken;
      const user = credential.fullName;

      const authService = new AppleSignInService({
        authorizationCode: authorizationCode,
        identityToken: identityToken,
        firstName: user.givenName,
        lastName: user.familyName,
      });
      const resolver = new AuthServiceResolver(authService);
      await resolver.signIn();

      await checkIsLogged();
    } catch (error) {
      console.log("🚀 ~ handleSignIn ~ error:", error);
      if (error instanceof CustomError) {
        errorToast({
          title: error?.message,
          slow: true,
        });
        return;
      }

      errorToast({
        title: lang?.failedToSignInWithApple,
        slow: true,
      });
    }
  };

  return (
    <View style={signInInButtonStyles.container}>
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={
          AppleAuthentication.AppleAuthenticationButtonStyle.WHITE_OUTLINE
        }
        cornerRadius={5}
        style={signInInButtonStyles.button}
        onPress={handleSignIn}
      />
    </View>
  );
}
