import { API } from "../../../../src/constants/wordpress";
import { APP_COLORS } from "../../../../src/constants/colors";
import {
  CustomSafeAreaView,
  ErrorResults,
  ListContainer,
} from "../../../../src/modules/common";
import { Link } from "expo-router";
import {
  OrderCard,
  OrdersListSkeleton,
  useOrders,
} from "../../../../src/modules/order";
import { useAuth } from "../../../../src/modules/auth";
import { useState } from "react";
import { View, Text, FlatList, RefreshControl } from "react-native";
import lang from "../../../../src/lang/es";

export default function OrdersHistory() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { user } = useAuth();
  const { isLoading, isError, orders, refetch, fetchNextPage, hasNextPage } =
    useOrders({
      customerId: user?.id,
      perPage: API.CUSTOMER_ORDERS.RESULTS_PER_PAGE,
      orderBy: "count",
    });

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  if (isLoading || isRefreshing) {
    return (
      <CustomSafeAreaView>
        <OrdersListSkeleton />
      </CustomSafeAreaView>
    );
  }

  if (isError) {
    return (
      <CustomSafeAreaView>
        <View className="my-auto">
          <ErrorResults infoMessage={lang?.errorLoadingOrdersHistory} />
        </View>
      </CustomSafeAreaView>
    );
  }

  if (orders.length === 0) {
    return (
      <CustomSafeAreaView>
        <View className="flex flex-col items-center justify-center my-auto">
          <View className="flex flex-col items-center">
            <Text className="text-lg font-bold">
              {lang?.ordersHistoryIsEmpty}
            </Text>

            <Text className="text-center text-base px-6">
              {lang?.ordersHistoryIsEmptyDescription}
            </Text>
          </View>

          <View className="flex flex-row items-center space-x-4 pt-4">
            <Link className="text-secondary text-base py-2 px-4" href="/Uio">
              {lang?.uioCity}
            </Link>

            <Link className="text-secondary text-base py-2 px-4" href="/Gye">
              {lang?.gyeCity}
            </Link>
          </View>
        </View>
      </CustomSafeAreaView>
    );
  }

  return (
    <CustomSafeAreaView>
      <FlatList
        data={orders}
        renderItem={({ item }) => <OrderCard order={item} />}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={hasNextPage ? fetchNextPage : null}
        onEndReachedThreshold={0.95}
        numColumns={1}
        ListFooterComponent={
          <ListContainer>
            {hasNextPage ? <OrdersListSkeleton /> : null}
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
