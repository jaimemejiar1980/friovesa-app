import { useState } from "react";
import { View, Text, TextInput } from "react-native";

export default function FormField({
  title,
  placeholder,
  value,
  handleChangeText,
  mark = false,
  titleColorFeedback = true,
  autoCapitalize = "sentences",
}) {
  const [isActive, setIsActive] = useState(false);

  const handleActive = () => {
    if (titleColorFeedback) {
      setIsActive(true);
    }
  };

  return (
    <View className="space-y-1">
      {title && (
        <Text
          className={`px-1 text-base ${
            isActive ? "text-secondary" : "text-gray-600"
          }`}
        >
          {title}
        </Text>
      )}
      <View
        className={`w-full flex flex-row items-center border-2 border-x-0 border-t-0 border-border ${
          mark ? "border-error-content" : "border-border focus:border-green-600"
        }`}
      >
        <TextInput
          placeholder={placeholder}
          onFocus={handleActive}
          onBlur={() => setIsActive(false)}
          value={value}
          onChangeText={handleChangeText}
          className={`px-1 flex-1 flex-row items-center text-base `}
          autoCapitalize={autoCapitalize}
        />
      </View>
    </View>
  );
}
