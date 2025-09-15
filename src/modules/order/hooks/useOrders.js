import { generateNextCursor } from "../../../lib/Pagination";
import { OrderService } from "../services";
import { useInfiniteQuery } from "@tanstack/react-query";

async function fetchOrders({ customerId, page, perPage, orderBy }) {
  const orderService = new OrderService();
  const orders = await orderService.getCustomerOrders({
    customerId,
    page,
    perPage,
    orderBy,
  });

  const nextCursor = generateNextCursor(orders.pagination);

  return {
    categories: orders.data,
    nextCursor,
  };
}

export default function useOrders({ customerId, perPage, orderBy }) {
  const { isLoading, isError, data, refetch, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["orders", customerId],
      queryFn: async ({ pageParam }) =>
        await fetchOrders({ customerId, page: pageParam, perPage, orderBy }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    });

  return {
    isLoading,
    isError,
    orders: data?.pages.flatMap((page) => page.categories) ?? [],
    refetch,
    fetchNextPage,
    hasNextPage,
  };
}
