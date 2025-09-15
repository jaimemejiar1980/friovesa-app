import { Image } from "expo-image";
import { ImageUrlErrorBoundary } from "../../common";
import { View, Text } from "react-native";

export function BundlesList({ bundle, parentName }) {
  return (
    <>
      {bundle?.map((product) => (
        <View key={product?.id}>
          <View className="flex flex-row space-x-2 items-center justify-between">
            <View className="w-1/12">
              <View className="w-10 h-10">
                <ImageUrlErrorBoundary
                  imageUrl={product?.imageUrl}
                  fallback={<View className="w-full h-full bg-gray-200" />}
                >
                  <Image
                    source={{ uri: product?.imageUrl }}
                    className="h-full w-full object-cover"
                  />
                </ImageUrlErrorBoundary>
              </View>
            </View>

            <View className="w-10/12">
              <Text className="text-copy-light">{`${parentName} - ${product?.name} x ${product?.quantity}`}</Text>
            </View>
          </View>
        </View>
      ))}
    </>
  );
}
