import { Image } from "expo-image";
import { Card, ImageUrlErrorBoundary } from "../../common";
import { View, Text, TouchableOpacity } from "react-native";

export default function PaymentMethod({ method, isSelected, handleSelect }) {
  const { title, icon } = method;

  return (
    <Card>
      <TouchableOpacity
        onPress={handleSelect}
        className="flex flex-row py-4 pr-4"
      >
        <View className="w-2/12 my-auto md:pl-10">
          <View className="mx-auto w-5 h-5 border border-gray-500 p-1 rounded-full flex flex-row justify-center items-center bg-slate-50">
            {isSelected && <View className="w-3 h-3 bg-primary rounded-full" />}
          </View>
        </View>

        <View className="w-10/12 space-y-3">
          <Text className="text-copy-light font-bold text-lg">{title}</Text>

          {icon && (
            <View className="w-full h-16 p-1 mx-auto">
              <ImageUrlErrorBoundary
                imageUrl={icon}
                fallback={<View className="w-full h-full bg-gray-200" />}
              >
                <Image
                  className="h-full w-full"
                  source={{ uri: icon }}
                  contentFit="contain"
                />
              </ImageUrlErrorBoundary>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </Card>
  );
}
