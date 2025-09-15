import { Image } from "expo-image";
import { ImageUrlErrorBoundary } from "../../../common";
import { View } from "react-native";

export function ProductDetailsImage({ imageUrl }) {
  return (
    <View className="w-full h-72 md:h-[500px]">
      <ImageUrlErrorBoundary
        imageUrl={imageUrl}
        fallback={<View className="w-full h-full bg-gray-200" />}
      >
        <Image
          source={{ uri: imageUrl }}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </ImageUrlErrorBoundary>
    </View>
  );
}
