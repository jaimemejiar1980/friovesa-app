import { API } from "../../constants/wordpress";
import {
  CustomSafeAreaView,
  ErrorResults,
  HeaderSearch,
  ListContainer,
  NoResults,
  StartSearch,
} from "../../modules/common";
import {
  ProductCardFactory,
  ProductsListSkeleton,
  useSearchProducts,
} from "../../modules/products";
import {
  FlatList,
  RefreshControl,
  useWindowDimensions,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import lang from "../../lang/es";
import { APP_COLORS } from "../../constants/colors";
import { useLocalSearchParams } from "expo-router";

export function SearchScreen() {
  const { width } = useWindowDimensions();
  const [columns, setColumns] = useState(2);
  const [isFirstSearch, setIsFirstSearch] = useState(true);

  const city = useLocalSearchParams();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const { isLoading, isError, products, refetch, fetchNextPage, hasNextPage } =
    useSearchProducts({
      category: city?.cityId,
      perPage: width > 768 ? 12 : API.PRODUCTS.RESULTS_PER_PAGE,
      orderBy: "include",
      search: search,
    });

  useEffect(() => {
    const changeColumns = () => {
      setColumns(width > 768 ? 3 : 2);
    };

    changeColumns();
  }, []);

  const handleChangeSearchValue = (event) => {
    setSearch(event);
  };

  const handleRefresh = async () => {
    setIsFirstSearch(false);
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  const renderActiveHeaderSearch = () => (
    <HeaderSearch
      isSearchActive={true}
      searchParameter={search}
      handleChangeText={handleChangeSearchValue}
      handlePressSearch={handleRefresh}
    />
  );

  if (isLoading || isRefreshing) {
    return (
      <CustomSafeAreaView>
        {renderActiveHeaderSearch()}

        <ProductsListSkeleton />
      </CustomSafeAreaView>
    );
  }

  if (isError) {
    return (
      <CustomSafeAreaView>
        {renderActiveHeaderSearch()}

        <View className="pt-48">
          <ErrorResults infoMessage={lang?.errorLoadingProducts} />
        </View>
      </CustomSafeAreaView>
    );
  }

  if (isFirstSearch) {
    return (
      <CustomSafeAreaView>
        {renderActiveHeaderSearch()}

        <View className="pt-48">
          <StartSearch />
        </View>
      </CustomSafeAreaView>
    );
  }

  if (!isFirstSearch && products?.length === 0) {
    return (
      <CustomSafeAreaView>
        {renderActiveHeaderSearch()}

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
        ListHeaderComponent={renderActiveHeaderSearch()}
        ListFooterComponent={
          <ListContainer>
            {hasNextPage ? <ProductsListSkeleton /> : null}
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
