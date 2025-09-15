import { Text, TouchableOpacity, View } from "react-native";

export default function ActionButton({ title, handlePress, isActive = true }) {
  const handlePressAction = () => {
    if (isActive) {
      handlePress();
    }
  };

  return (
    <>
      {isActive ? (
        <TouchableOpacity
          className="w-full rounded-full bg-secondary h-14 mx-auto flex flex-row justify-center items-center"
          onPress={handlePressAction}
        >
          <Text className="text-center text-foreground text-base">{title}</Text>
        </TouchableOpacity>
      ) : (
        <View
          className="w-full rounded-full bg-gray-400 h-14 mx-auto flex flex-row justify-center items-center"
          onPress={handlePressAction}
        >
          <Text className="text-center text-foreground text-base">{title}</Text>
        </View>
      )}
    </>
  );
}
