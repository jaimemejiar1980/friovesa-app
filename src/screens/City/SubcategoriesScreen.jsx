import { API } from "../../constants/wordpress";
import { APP_COLORS } from "../../constants/colors";
import {
  CategoriesListSkeleton,
  CategoriesScrollableMenu,
  CategoriesScrollableMenuSkeleton,
  CategoryCard,
  useCategories,
} from "../../modules/categories";
import {
  CustomSafeAreaView,
  ErrorResults,
  ListContainer,
} from "../../modules/common";
import { FlatList } from "react-native-gesture-handler";
import { RefreshControl, View } from "react-native";
import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { useActiveProduct } from "../../modules/products";

export default function SubcategoriesScreen({ categoryId, parentId, path }) {
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
    parentId: categoryId,
    perPage: API.CATEGORIES.RESULTS_PER_PAGE,
    orderBy: "id",
  });

  const handleNavigateToList = useCallback(() => {
    const params = new URLSearchParams({
      parentId,
      goBack: true,
    });
    /**
     * If there are no categories, we navigate to the list screen
     * with the parentId and goBack query params.
     * The goBack query param is used to navigate from CategoriesScrollableMenu to ancestor categories.
     * Also, the route must be replace to avoid the user to go back to the subcategory screen with no results.
     */
    router.replace(`${path}/list/${categoryId}?${params.toString()}`);
  }, [parentId, categoryId, path]);

  const handlePress = useCallback(
    (subcategory) => {
      setScreenTitle(subcategory?.name);

      const params = new URLSearchParams({ parentId: parentId });
      router.navigate(`${path}/list/${subcategory?.id}?${params.toString()}`);
    },
    [categoryId, path]
  );

  useEffect(() => {
    if (isLoading || isError) return;

    if (categories?.length > 0) return;

    handleNavigateToList();
  }, [isLoading, isError, categories, categoryId]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  /**
   * If there are no categories in the results, tht skeletons are shown.
   * This avoid the user to see a blank screen while router navigates to the list screen.
   */
  if (isLoading || isRefreshing || categories.length === 0) {
    return (
      <CustomSafeAreaView>
        <View>
          <CategoriesScrollableMenuSkeleton />
        </View>

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
        ListHeaderComponent={
          <CategoriesScrollableMenu
            parentId={parentId}
            path={`${path}/subcategory`}
          />
        }
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
