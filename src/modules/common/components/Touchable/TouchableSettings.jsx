import { APP_COLORS } from "../../../../constants/colors";
import { Image } from "expo-image";
import { nextIcon } from "../../../../constants/icons";
import { View, Text, TouchableOpacity } from "react-native";
import TouchableSettingsSeparator from "./TouchableSettingsSeparator";

export default function TouchableSettings({
  icon,
  title,
  iconColor,
  titleColor,
  handlePress,
  isEnd = false,
}) {
  return (
    <TouchableOpacity onPress={handlePress}>
      <View className="flex flex-row">
        <View className="w-2/12 md:w-1/12 flex flex-row items-center">
          <View className="w-10 h-10 p-2">
            <Image
              source={icon}
              style={{
                width: "100%",
                height: "100%",
              }}
              tintColor={iconColor ? iconColor : APP_COLORS.copyDarkLighter}
            />
          </View>
        </View>

        <View className="w-10/12 md:w-11/12 pl-2">
          <TouchableSettingsSeparator />
          <View className="flex flex-row py-1 justify-between">
            <View className="flex flex-col justify-center ">
              <Text
                className="text-base"
                style={{
                  color: titleColor ? titleColor : "#000",
                }}
              >
                {title}
              </Text>
            </View>

            <View className="w-11 h-11 p-2">
              <Image
                source={nextIcon}
                style={{
                  width: "100%",
                  height: "100%",
                }}
                tintColor={APP_COLORS.copyDarkLighter}
              />
            </View>
          </View>
          {isEnd && <TouchableSettingsSeparator />}
        </View>
      </View>
    </TouchableOpacity>
  );
}
