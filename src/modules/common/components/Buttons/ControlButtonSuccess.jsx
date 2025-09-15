import { Text, TouchableOpacity } from "react-native";

export default function ControlButtonSuccess({
  title,
  handlePress,
  disabled = false,
}) {
  return (
    <TouchableOpacity
      className={`px-2 py-3 rounded-md border ${
        disabled ? "border border-gray-400" : "border-secondary bg-secondary"
      }`}
      onPress={handlePress}
      disabled={disabled}
    >
      <Text
        className={`text-center text-base ${
          disabled ? "text-gray-400" : "text-foreground"
        }`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
