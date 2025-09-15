import { Text, TouchableOpacity } from "react-native";

export default function ControlButtonCancel({
  title,
  handlePress,
  disabled = false,
}) {
  return (
    <TouchableOpacity
      className="px-2 py-3 rounded-md border border-gray-300 bg-gray-100"
      onPress={handlePress}
      disabled={disabled}
    >
      <Text className="text-center text-base text-gray-600">{title}</Text>
    </TouchableOpacity>
  );
}
