import {
  ActionButton,
  FormField,
  FormFieldSecure,
} from "../../src/modules/common";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { APP_COLORS } from "../../src/constants/colors";
import { appIcon } from "../../src/constants/icons";
import {
  Auth,
  AuthServiceResolver,
  SimpleSignInService,
} from "../../src/modules/auth";
import { CustomError } from "../../src/errors";
import { errorToast, successToast } from "../../src/lib/Toast";
import { Image } from "expo-image";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../src/modules/auth";
import { useEffect, useState } from "react";
import { validateSignUpFields } from "../../src/modules/auth/validations";
import lang from "../../src/lang/es";

export default function SignUp() {
  const { checkIsLogged, isLogged } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    username: "",
    name: "",
    lastName: "",
    email: "",
    password: "",
    checkedPassword: "",
  });

  useEffect(() => {
    if (!isLogged) return;
    router.replace("/home");
  }, [isLogged]);

  const handleSignUp = async () => {
    let validatedData = {};
    try {
      validatedData = validateSignUpFields({
        username: form.username,
        name: form.name,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
        checkedPassword: form.checkedPassword,
      });
    } catch (error) {
      errorToast({
        title: error?.message,
        slow: true,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const isSignedUp = await Auth.signUp({
        username: validatedData.username,
        name: validatedData.name,
        lastName: validatedData.lastName,
        email: validatedData.email,
        password: validatedData.password,
      });

      if (isSignedUp) {
        successToast({
          title: lang?.accountCreated,
        });
      }
    } catch (error) {
      console.log("🚀 ~ handleSignUp ~ error:", error);
      setIsSubmitting(false);

      if (error instanceof CustomError) {
        errorToast({
          title: error?.message,
          slow: true,
        });
        return;
      }

      errorToast({
        title: lang?.failedToSignUp,
        slow: true,
      });

      return;
    }

    try {
      const authService = new SimpleSignInService(form);
      const resolver = new AuthServiceResolver(authService);
      await resolver.signIn();

      await checkIsLogged();
    } catch (error) {
      console.log("🚀 ~ handleSignUp ~ error:", error);
      if (error instanceof CustomError) {
        errorToast({
          title: error?.message,
          slow: true,
        });
      }

      errorToast({
        title: lang?.failedToLogin,
        slow: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-background h-full px-4">
      <ScrollView
        className="space-y-7"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <View>
          <Image
            source={appIcon}
            className="w-32 h-32 mx-auto"
            style={{ tintColor: APP_COLORS.primary }}
          />
        </View>

        <View className="space-y-3">
          <View className="space-y-3">
            <View>
              <FormField
                autoCapitalize="none"
                title={lang?.username}
                placeholder={lang?.enterYourUsername}
                value={form.username}
                handleChangeText={(event) =>
                  setForm({ ...form, username: event })
                }
              />
            </View>

            <View>
              <FormField
                title={lang?.name}
                placeholder={lang?.enterYourFirstName}
                value={form.name}
                handleChangeText={(event) => setForm({ ...form, name: event })}
              />
            </View>

            <View>
              <FormField
                title={lang?.lastName}
                placeholder={lang?.enterYourLastName}
                value={form.lastName}
                handleChangeText={(event) =>
                  setForm({ ...form, lastName: event })
                }
              />
            </View>

            <View>
              <FormField
                autoCapitalize="none"
                title={lang?.email}
                placeholder={lang?.enterYourEmail}
                value={form.email}
                handleChangeText={(event) => setForm({ ...form, email: event })}
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

            <View>
              <FormFieldSecure
                title={lang?.checkYourPassword}
                placeholder={lang?.checkYourPassword}
                value={form.checkedPassword}
                handleChangeText={(event) =>
                  setForm({ ...form, checkedPassword: event })
                }
              />
            </View>
          </View>

          <View className="space-y-3">
            <View className="flex flex-col justify-center items-center">
              <Text className="text-base">{lang?.bySignUp} </Text>

              <View className="flex flex-col justify-center items-center md:flex-row">
                <View className="flex flex-row">
                  <Link href="/termsAndConditions">
                    <Text className="text-secondary text-base underline">
                      {lang?.termsAndConditions}
                    </Text>
                  </Link>

                  <Text className="text-base"> {lang?.and} </Text>
                </View>

                <Link href="/privacyPolicy">
                  <Text className="text-secondary text-base underline">
                    {lang?.privacyPolicy}
                  </Text>
                </Link>
              </View>
            </View>

            <View>
              {isSubmitting ? (
                <View className="rounded-full bg-secondary w-12 h-12 mx-auto flex flex-row justify-center items-center">
                  <ActivityIndicator
                    size="large"
                    color={APP_COLORS.foreground}
                  />
                </View>
              ) : (
                <ActionButton
                  title={lang?.createAnAccount}
                  handlePress={handleSignUp}
                />
              )}
            </View>

            <View className="flex flex-row justify-center h-20">
              <Text className="text-base">{lang?.or} </Text>
              <Link href="/login">
                <Text className="text-secondary text-base underline">
                  {lang?.loginToYourAccount}
                </Text>
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
