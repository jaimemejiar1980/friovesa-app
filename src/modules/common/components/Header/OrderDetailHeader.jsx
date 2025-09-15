import { GoBackHeaderIcon } from "./GoBackHeaderIcon";
import { InnerHeaderContainer } from "./InnerHeaderContainer";
import { Pressable, Text, View } from "react-native";
import { router } from "expo-router";
import lang from "../../../../lang/es";
import ShadowView from "../ShadowView";

export default function OrderDetailHeader({ goBackPath }) {
  const handleGoBack = () => {
    router.back();
    router.replace(goBackPath);
  };

  return (
    <ShadowView>
      <InnerHeaderContainer>
        <View className="w-3/12 pr-1">
          <Pressable
            onPress={handleGoBack}
            className="flex flex-row items-center space-x-2"
          >
            <GoBackHeaderIcon />

            <Text className="text-copy-lighter font-bold text-lg px-1">
              {lang?.home}
            </Text>
          </Pressable>
        </View>

        <View className="w-6/12 px-1">
          <View className="mx-auto">
            <Text className="text-lg text-primary font-bold">
              {lang?.makePayment}
            </Text>
          </View>
        </View>
      </InnerHeaderContainer>
    </ShadowView>
  );
}
