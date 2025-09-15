import { APP_COLORS } from "../../../constants/colors";
import { BundlesList } from "./BundlesList";
import { Image } from "expo-image";
import { ImageUrlErrorBoundary, ModalPicker } from "../../../modules/common";
import { Picker } from "@react-native-picker/picker";
import { removeIcon } from "../../../constants/icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { View, Text, Platform } from "react-native";

export default function CartProduct({
  product,
  handleSetQuantity,
  handleRemoveFromCart,
}) {
  const isIos = Platform.OS === "ios";
  const { imageUrl, name, formattedPrice, stockQuantity, quantity, uuid } =
    product;

  return (
    <View className="flex flex-col space-y-2 px-1">
      <View className="flex-row justify-between">
        <View className="w-1/12 my-auto">
          <View className="mx-auto">
            <TouchableOpacity onPress={() => handleRemoveFromCart(uuid)}>
              <Image
                className="w-6 h-6 md:w-8 md:h-8"
                source={removeIcon}
                style={{
                  tintColor: APP_COLORS.copyDarkLighter,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View className="w-10/12 my-auto flex flex-row justify-between">
          <View className="w-4/12 md:w-3/12">
            <View className="h-24 md:h-36 w-full rounded-md overflow-hidden">
              <ImageUrlErrorBoundary
                imageUrl={imageUrl}
                fallback={<View className="w-full h-full bg-gray-200" />}
              >
                <Image
                  source={{ uri: imageUrl }}
                  className="h-full w-full object-cover"
                />
              </ImageUrlErrorBoundary>
            </View>
          </View>

          <View className="w-7/12 md:w-7/12 flex flex-col space-y-1">
            <View className="pr-2">
              <Text numberOfLines={2} ellipsizeMode="tail">
                {name}
              </Text>
            </View>

            <View className="flex flex-row space-x-1 flex-wrap">
              <Text className="text-lg">{formattedPrice}</Text>
            </View>

            <View className="w-9/12 border border-border rounded-md">
              {isIos ? (
                <ModalPicker
                  defaultValue={quantity}
                  value={quantity}
                  items={Array.from({ length: stockQuantity }, (_, i) => {
                    const value = i + 1;

                    return {
                      title: value,
                      value,
                    };
                  })}
                  handlePickValue={(itemValue) =>
                    handleSetQuantity(uuid, itemValue)
                  }
                />
              ) : (
                <Picker
                  selectedValue={quantity}
                  onValueChange={(itemValue) =>
                    handleSetQuantity(uuid, itemValue)
                  }
                  style={{
                    marginHorizontal: -5,
                    marginVertical: -10,
                  }}
                >
                  {Array.from({ length: stockQuantity }, (_, i) => (
                    <Picker.Item label={i + 1} value={i + 1} key={i} />
                  ))}
                </Picker>
              )}
            </View>
          </View>
        </View>
      </View>

      {product?.bundle && (
        <View className="pt-2 px-2">
          <BundlesList bundle={product?.bundle} parentName={name} />
        </View>
      )}
    </View>
  );
}
