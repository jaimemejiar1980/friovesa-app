import { TouchableOpacity } from "react-native-gesture-handler";
import { View, Text } from "react-native";

export default function ShippingZone({ zone, onPress, isSelected }) {
  const handlePress = () => {
    onPress();
  };

  return (
    <TouchableOpacity className="flex flex-row py-4" onPress={handlePress}>
      <View className="w-2/12 p-2 my-auto md:pl-5">
        <View className="w-5 h-5 border border-gray-500 p-1 rounded-full flex flex-row justify-center items-center">
          {isSelected && <View className="w-3 h-3 bg-primary rounded-full" />}
        </View>
      </View>

      <View className="w-10/12 flex flex-col justify-center">
        <Text className="text-primary font-bold text-base">
          {zone?.title}: {zone?.costPerOrder}
        </Text>
        {zone?.description && (
          <Text className="text-base">{zone?.description}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}
