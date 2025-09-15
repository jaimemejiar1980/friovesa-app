import { ActionButton, FormField, FormFieldSecure } from "../../common";
import {
  ActivityIndicator,
  Linking,
  Pressable,
  Text,
  View,
} from "react-native";
import { APP_COLORS } from "../../../constants/colors";
import { APP_EXTERNAL_LINKS } from "../../../constants";
import { AuthServiceResolver, SimpleSignInService } from "../services";
import { CustomError } from "../../../errors";
import { emailIcon } from "../../../constants/icons";
import { errorToast } from "../../../lib/Toast";
import { Image } from "expo-image";
import { router } from "expo-router";
import { signInInButtonStyles } from "./signInButtonStyles";
import { useAuth } from "../hooks";
import { useEffect, useState } from "react";
import lang from "../../../lang/es";

export default function SimpleSignIn() {
  const url = APP_EXTERNAL_LINKS.APP_WEB.RESTORE_PASSWORD;
  const [isActivated, setIsActivated] = useState(false);
  const { checkIsLogged, isLogged } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleOpenForm = () => setIsActivated(!isActivated);

  useEffect(() => {
    if (!isLogged) return;
    router.replace("/home");
  }, [isLogged]);

  const handleSignIn = async () => {
    if (form.username.trim() === "" || form.password.trim() === "") {
      errorToast({
        title: lang?.pleaseInput,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const authService = new SimpleSignInService(form);
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
        title: lang?.failedToLogin,
        slow: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoToWeb = () => {
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        }
      })
      .catch((error) => {
        console.log("🚀 ~ handleGoToWeb ~ error:", error);
      });
  };

  return (
    <View className="space-y-7">
      <View style={signInInButtonStyles.container}>
        <View
          style={{
            ...signInInButtonStyles.button,
            borderWidth: 0.5,
            borderRadius: 5,
          }}
        >
          <Pressable
            className="flex flex-row justify-center items-center w-full h-full space-x-2"
            onPress={() => handleOpenForm()}
          >
            <View className="w-5 h-5">
              <Image source={emailIcon} className="w-full h-full" />
            </View>

            <Text className="text-base font-semibold">
              {lang?.signInWithEmail}
            </Text>
          </Pressable>
        </View>
      </View>

      {isActivated && <View className="h-[1px] bg-gray-300 rounded-md" />}

      {isActivated && (
        <View className="space-y-4 flex flex-col justify-center">
          <View>
            <FormField
              autoCapitalize="none"
              title={lang?.username}
              placeholder={lang?.enterYourEmailOrUsername}
              value={form.username}
              handleChangeText={(event) =>
                setForm({ ...form, username: event })
              }
            />
          </View>

          <View>
            <FormFieldSecure
              title={lang?.password}
              placeholder={lang?.enterYourPassword}
              value={form.password}
              handleChangeText={(event) =>
                setForm({ ...form, password: event })
              }
            />
          </View>

          <View className="mx-auto">
            <Text
              className="text-secondary underline text-base"
              onPress={handleGoToWeb}
            >
              {lang?.resetPassword}
            </Text>
          </View>

          <View>
            {isSubmitting ? (
              <View className="mx-auto rounded-full bg-secondary max-w-min w-14 h-14 flex flex-row justify-center items-center">
                <ActivityIndicator size="large" color={APP_COLORS.foreground} />
              </View>
            ) : (
              <ActionButton
                title={lang.signInWithEmail}
                handlePress={handleSignIn}
              />
            )}
          </View>
        </View>
      )}
    </View>
  );
}
