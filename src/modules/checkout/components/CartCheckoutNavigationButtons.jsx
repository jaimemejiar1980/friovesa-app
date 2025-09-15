import { View, Text, TouchableOpacity } from "react-native";
import lang from "../../../lang/es";

export default function CartCheckoutNavigationButtons({
  handleBack,
  handleNext,
  showLeftButton = true,
}) {
  return (
    <View
      className={`flex flex-row pt-4 pb-2 ${
        showLeftButton ? "justify-between" : "justify-end"
      }`}
    >
      <View className="w-6/12 pr-2">
        <TouchableOpacity
          className={`px-2 py-3 rounded-md border border-gray-300 bg-gray-100 ${
            showLeftButton ? "visible" : "hidden"
          }`}
          onPress={handleBack}
        >
          <Text className="text-center text-base text-gray-600">{lang?.goBack}</Text>
        </TouchableOpacity>
      </View>

      <View className="w-6/12 pl-2">
        <TouchableOpacity
          className="px-2 py-3 rounded-md border border-secondary bg-secondary"
          onPress={handleNext}
        >
          <Text className="text-center text-base text-foreground">{lang?.continue}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
