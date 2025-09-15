import { API } from "../../constants/wordpress";
import { APP_COLORS } from "../../constants/colors";
import {
  CategoriesScrollableMenu,
  CategoriesScrollableMenuSkeleton,
} from "../../modules/categories";
import {
  CustomSafeAreaView,
  ErrorResults,
  ListContainer,
  NoResults,
} from "../../modules/common";
import {
  FlatList,
  RefreshControl,
  View,
  useWindowDimensions,
} from "react-native";
import {
  ProductCardFactory,
  ProductsListSkeleton,
  useProducts,
} from "../../modules/products";
import { usePathname } from "expo-router";
import { useEffect, useState } from "react";
import lang from "../../lang/es";

export default function ProductsListScreen({ categoryId, parentId }) {
  const { width } = useWindowDimensions();
  const [columns, setColumns] = useState(2);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { isLoading, isError, products, refetch, fetchNextPage, hasNextPage } =
    useProducts({
      category: categoryId,
      perPage: width > 768 ? 12 : API.PRODUCTS.RESULTS_PER_PAGE,
      orderBy: "include",
    });
  const pathname = usePathname();

  useEffect(() => {
    const changeColumns = () => {
      setColumns(width > 768 ? 3 : 2);
    };

    changeColumns();
  }, []);

  const getProductsCityPath = () => {
    const pathArray = pathname.split("/");
    return [pathArray[1], "subcategory"].join("/");
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  if (isLoading || isRefreshing) {
    return (
      <CustomSafeAreaView>
        <View>
          <CategoriesScrollableMenuSkeleton />
        </View>

        <ProductsListSkeleton />
      </CustomSafeAreaView>
    );
  }

  if (isError) {
    return (
      <CustomSafeAreaView>
        <View>
          <CategoriesScrollableMenu
            parentId={parentId}
            path={getProductsCityPath()}
          />
        </View>

        <View className="pt-48">
          <ErrorResults infoMessage={lang?.errorLoadingCategoryProducts} />
        </View>
      </CustomSafeAreaView>
    );
  }

  if (products?.length === 0) {
    return (
      <CustomSafeAreaView>
        <View>
          <CategoriesScrollableMenu
            parentId={parentId}
            path={getProductsCityPath()}
          />
        </View>

        <View className="pt-48">
          <NoResults />
        </View>
      </CustomSafeAreaView>
    );
  }

  return (
    <CustomSafeAreaView>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <View className="w-1/2 md:w-4/12">
            <ProductCardFactory product={item} />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={hasNextPage ? fetchNextPage : null}
        onEndReachedThreshold={0.95}
        numColumns={columns}
        ListHeaderComponent={
          <CategoriesScrollableMenu
            parentId={parentId}
            path={getProductsCityPath()}
          />
        }
        ListFooterComponent={
          <ListContainer>
            {hasNextPage && products?.length > 3 ? (
              <ProductsListSkeleton />
            ) : null}
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
