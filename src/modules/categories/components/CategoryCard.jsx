import { Card, ImageUrlErrorBoundary } from "../../common";
import { Image } from "expo-image";
import { View, Text, TouchableOpacity } from "react-native";

export default function CategoryCard({ category, handlePress }) {
  return (
    <Card additionalStyles="h-36 md:h-48">
      <TouchableOpacity
        className="h-full w-full space-y-1 flex flex-col justify-center items-center p-2"
        onPress={handlePress}
      >
        <View className="mx-auto">
          <View className="w-20 h-20 md:w-28 md:h-28 overflow-hidden">
            <ImageUrlErrorBoundary
              imageUrl={category.imageUrl}
              fallback={
                <View className="w-full h-full bg-gray-200 rounded-full" />
              }
            >
              <Image
                source={{ uri: category.imageUrl }}
                className="w-full h-full"
              />
            </ImageUrlErrorBoundary>
          </View>
        </View>
        <View>
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            className="text-primary text-center md:text-base"
          >
            {category.name}
          </Text>
        </View>
      </TouchableOpacity>
    </Card>
  );
}
