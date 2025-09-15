import { APP_COLORS } from "../../../../constants/colors";
import { eyeIcon, eyeOffIcon } from "../../../../constants/icons";
import { Image } from "expo-image";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

export default function FormFieldSecure({
  title,
  placeholder,
  value,
  handleChangeText,
}) {
  const [isActive, setIsActive] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleActive = () => setIsActive(true);
  const handleShowPassword = () => setShowPassword(!showPassword);

  return (
    <View className="space-y-1">
      <Text
        className={`px-1 text-base ${
          isActive ? "text-secondary" : "text-gray-600"
        }`}
      >
        {title}
      </Text>
      <View className="w-full flex flex-row items-center border-2 border-x-0 border-t-0 border-border focus:border-green-600">
        <TextInput
          placeholder={placeholder}
          onFocus={handleActive}
          onBlur={() => setIsActive(false)}
          value={value}
          onChangeText={handleChangeText}
          className="px-1 flex-1 flex-row items-center text-base"
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={handleShowPassword}>
          <Image
            source={showPassword ? eyeIcon : eyeOffIcon}
            className="w-6 h-6 mr-1"
            style={{
              tintColor: showPassword
                ? APP_COLORS.secondary
                : APP_COLORS.copyDarkLighter,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
