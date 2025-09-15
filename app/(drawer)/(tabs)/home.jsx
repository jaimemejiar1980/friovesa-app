import {
  AppVersionNotificationModal,
  useAppVersionNotification,
} from "../../../src/modules/notification";
import { gyeFlagIcon, uioFlagIcon } from "../../../src/constants/icons";
import { HOME_CAROUSEL } from "../../../src/constants/imagesCarousel";
import { HomeServices, useCarouselImages } from "../../../src/modules/home";
import {
  ImageCarousel,
  CustomSafeAreaView,
  TouchableCity,
} from "../../../src/modules/common";
import { router, usePathname } from "expo-router";
import { Text, View, ScrollView } from "react-native";
import { useMemo } from "react";
import lang from "../../../src/lang/es";

export default function Home() {
  const { isUpdateAvailable } = useAppVersionNotification();
  const pathname = usePathname();
  const { isLoading, isError, carrousel } = useCarouselImages({
    fetchCallback: HomeServices.getCarouselImages,
    queryKeys: ["home", "carousel", "header"],
  });

  // Determine if the current screen is the home screen
  const isHomeScreen = useMemo(() => pathname === "/home", [pathname]);

  // Centralized logic for setting carousel images
  const { headerImages } = useMemo(() => {
    if (isError || isLoading) {
      return {
        headerImages: HOME_CAROUSEL,
      };
    }
    return {
      headerImages: carrousel || HOME_CAROUSEL,
    };
  }, [isLoading, isError, carrousel]);

  return (
    <CustomSafeAreaView>
      <ScrollView className="px-[16px]">
        <View className="py-4 space-y-4 flex flex-col">
          <View>
            <ImageCarousel images={headerImages} autoPlay={isHomeScreen} />
          </View>

          <View className="flex flex-col space-y-4">
            <Text className="text-primary font-bold text-xl text-center md:text-3xl">
              {lang?.selectYourCity}
            </Text>

            <View className="w-full space-y-4">
              <View>
                <TouchableCity
                  cityTitle={lang.uioCity}
                  cityIcon={uioFlagIcon}
                  handlePress={() => router.push("(tabs)/Uio")}
                />
              </View>

              <View>
                <TouchableCity
                  cityTitle={lang.gyeCity}
                  cityIcon={gyeFlagIcon}
                  handlePress={() => router.push("(tabs)/Gye")}
                />
              </View>
            </View>
          </View>

          <View className="h-10" />
        </View>
      </ScrollView>

      {isUpdateAvailable && <AppVersionNotificationModal />}
    </CustomSafeAreaView>
  );
}
