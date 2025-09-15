import { API } from "../../../constants/wordpress";
import { CategoriesScrollableMenuSkeleton } from "./skeletons";
import { Image } from "expo-image";
import { ImageUrlErrorBoundary, ShadowView } from "../../common";
import { memo } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useCategories } from "../hooks";

function CategoriesScrollableMenu({ parentId, path }) {
  const params = useLocalSearchParams();
  const getParentId = () => {
    if (parentId) {
      return parentId;
    }
    return params.parentId;
  };

  const { isLoading, isError, categories } = useCategories({
    parentId: getParentId(),
    perPage: API.CATEGORIES.RESULTS_PER_PAGE,
    orderBy: "id",
  });

  const handlePress = (categoryId) => {
    const params = new URLSearchParams({ parentId: getParentId() });
    router.navigate(`${path}/${categoryId}?${params}`);
  };

  if (isLoading) {
    return <CategoriesScrollableMenuSkeleton />;
  }

  if (isError || categories?.length === 0) {
    return null;
  }

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View className="flex flex-row space-x-5 p-2 h-20 md:h-32">
        {categories?.map((category) => (
          <View key={category.id}>
            <ShadowView extraStyles="bg-gray-100 rounded-md">
              <TouchableOpacity
                onPress={() => handlePress(category.id)}
                className="flex flex-col space-y-1 items-center py-1 px-2 md:py-2 md:px-4"
              >
                <View className="h-10 w-10 md:h-16 md:w-16 rounded-full">
                  <ImageUrlErrorBoundary
                    imageUrl={category.imageUrl}
                    fallback={<View className="w-full h-full bg-gray-200" />}
                  >
                    <Image
                      source={{ uri: category.imageUrl }}
                      style={{
                        height: "100%",
                        width: "100%",
                      }}
                    />
                  </ImageUrlErrorBoundary>
                </View>

                <Text className="text-center uppercase text-xs">
                  {category.name}
                </Text>
              </TouchableOpacity>
            </ShadowView>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

export default memo(CategoriesScrollableMenu);
