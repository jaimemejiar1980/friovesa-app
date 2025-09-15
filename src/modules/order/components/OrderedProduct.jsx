import { Image } from "expo-image";
import { ImageUrlErrorBoundary } from "../../common";
import { View, Text } from "react-native";
import lang from "../../../lang/es";

export default function OrderedProduct({ product }) {
  const { name, total, quantity } = product;
  const imageUrl = product?.imageUrl || "#";

  return (
    <View>
      <View className="flex flex-col space-y-2">
        <View className="flex-row justify-between">
          <View className="w-3/12 h-20 md:h-28">
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

          <View className="w-8/12 flex flex-col space-y-1">
            <Text className="text-base font-bold">{name}</Text>

            <View className="text-base">
              <Text>
                {lang?.quantity}: {quantity}
              </Text>
            </View>

            <View className="text-base">
              <Text className="">
                {lang?.total}: {total}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View className="h-[1px] bg-gray-100 mt-2 mb-4" />
    </View>
  );
}
