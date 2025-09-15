import { API } from "../../constants/wordpress";
import { APP_COLORS } from "../../constants/colors";
import {
  CategoriesListSkeleton,
  CategoryCard,
  useCategories,
} from "../../modules/categories";
import {
  CustomSafeAreaView,
  ErrorResults,
  ListContainer,
  NoResults,
} from "../../modules/common";
import { router } from "expo-router";
import { useActiveProduct } from "../../modules/products";
import { useState } from "react";
import { View, FlatList, RefreshControl } from "react-native";
import lang from "../../lang/es";

export default function CategoriesScreen({ CategoryId, path }) {
  const { setScreenTitle } = useActiveProduct();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const {
    isLoading,
    isError,
    categories,
    refetch,
    fetchNextPage,
    hasNextPage,
  } = useCategories({
    parentId: CategoryId,
    perPage: API.CATEGORIES.RESULTS_PER_PAGE,
    orderBy: "count",
  });

  const handlePress = (category) => {
    setScreenTitle(category?.name);

    const params = new URLSearchParams({ parentId: CategoryId });
    router.navigate(`${path}/subcategory/${category?.id}?${params.toString()}`);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  if (isLoading || isRefreshing) {
    return (
      <CustomSafeAreaView>
        <CategoriesListSkeleton />
      </CustomSafeAreaView>
    );
  }

  if (isError) {
    return (
      <CustomSafeAreaView>
        <View className="h-full">
          <View className="my-auto">
            <ErrorResults />
          </View>
        </View>
      </CustomSafeAreaView>
    );
  }

  if (categories?.length === 0) {
    return (
      <CustomSafeAreaView>
        <View className="h-full">
          <View className="my-auto">
            <NoResults infoMessage={lang.noCityCategoriesResults} />
          </View>
        </View>
      </CustomSafeAreaView>
    );
  }

  return (
    <CustomSafeAreaView>
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <View className="w-1/3">
            <CategoryCard
              category={item}
              handlePress={() => handlePress(item)}
            />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={hasNextPage ? fetchNextPage : null}
        onEndReachedThreshold={0.5}
        numColumns={3}
        ListFooterComponent={
          <ListContainer>
            {hasNextPage ? <CategoriesListSkeleton /> : null}
          </ListContainer>
        }
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            colors={[APP_COLORS.secondary]}
          />
        }
      />
    </CustomSafeAreaView>
  );
}
