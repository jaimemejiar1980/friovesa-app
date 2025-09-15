import { APP_COLORS } from "../../../constants/colors";
import { Image } from "expo-image";
import { minusIcon, plusIcon } from "../../../constants/icons";
import { View, Text, TouchableOpacity } from "react-native";

export default function ProductsQuantityPicker({
  enabled = true,
  minQuantity = 1,
  maxQuantity = 10,
  quantity = 1,
  handleIncreaseQuantity,
  handleDecreaseQuantity,
}) {
  const isMinQuantity = quantity === minQuantity;
  const isDecreaseEnabled = !isMinQuantity && enabled;

  const isMaxQuantity = quantity === maxQuantity;
  const isIncreaseEnabled = !isMaxQuantity && enabled;

  return (
    <View className="w-full flex flex-row justify-between">
      <View className="w-2/12 flex flex-row justify-start">
        <TouchableOpacity
          onPress={handleDecreaseQuantity}
          disabled={!isDecreaseEnabled}
        >
          <View
            className={`${
              isDecreaseEnabled ? "bg-secondary" : "bg-gray-100"
            } w-9 h-9 md:w-11 md:h-11 p-2 rounded-md`}
          >
            <Image
              source={minusIcon}
              style={{
                width: "100%",
                height: "100%",
              }}
              tintColor={
                isDecreaseEnabled
                  ? APP_COLORS.foreground
                  : APP_COLORS.copyLighter
              }
            />
          </View>
        </TouchableOpacity>
      </View>

      <View className="w-6/12 flex flex-row items-center justify-center border-2 border-gray-100 rounded-md">
        <Text className="text-center">{quantity}</Text>
      </View>

      <View className="w-2/12 flex flex-row justify-end">
        <TouchableOpacity
          onPress={handleIncreaseQuantity}
          disabled={!isIncreaseEnabled}
        >
          <View
            className={`${
              isIncreaseEnabled ? "bg-secondary" : "bg-gray-100"
            } w-9 h-9 md:w-11 md:h-11 p-2 rounded-md`}
          >
            <Image
              source={plusIcon}
              style={{
                width: "100%",
                height: "100%",
              }}
              tintColor={
                isIncreaseEnabled
                  ? APP_COLORS.foreground
                  : APP_COLORS.copyLighter
              }
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
