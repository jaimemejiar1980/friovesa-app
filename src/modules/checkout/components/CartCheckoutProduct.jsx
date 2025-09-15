import { BundlesList } from "../../cart";
import { Image } from "expo-image";
import { ImageUrlErrorBoundary } from "../../common";
import { View, Text } from "react-native";

export default function CartCheckoutProduct({ product }) {
  const { imageUrl, name, quantity, formattedPrice } = product;

  return (
    <View className="flex flex-col space-y-2">
      <View className="flex-row justify-between">
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

        <View className="w-7/12 flex flex-col space-y-1">
          <Text numberOfLines={2} ellipsizeMode="tail">
            {name}
          </Text>

          <View className="flex flex-row space-x-1 flex-wrap">
            <Text className="text-lg">{formattedPrice}</Text>
          </View>

          <View className="w-7/12 border border-border rounded-md px-4 py-2">
            <Text>{quantity}</Text>
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

// BundlesList;
