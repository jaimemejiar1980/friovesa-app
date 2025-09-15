import { generateNextCursor } from "../../../lib/Pagination";
import { ProductService } from "../services";
import { useInfiniteQuery } from "@tanstack/react-query";

async function fetchProductsByIds({ page, perPage, relatedIds }) {
  const productService = new ProductService();
  const products = await productService.getProductsByIds({
    page,
    perPage,
    ids: relatedIds,
  });

  const nextCursor = generateNextCursor(products.pagination);

  return {
    products: products.data,
    nextCursor,
  };
}

export function useRelatedProducts({ perPage, relatedIds, productId }) {
  /**
   *  staleTime and gcTime are set to 0 to ensure that the data is always fresh.
   */
  const { isLoading, isError, data, refetch, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["related_products", productId],
      queryFn: async ({ pageParam }) =>
        await fetchProductsByIds({ page: pageParam, perPage, relatedIds }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      staleTime: 0,
      gcTime: 0,
    });

  return {
    isLoading,
    isError,
    products: data?.pages.flatMap((page) => page.products) ?? [],
    refetch,
    fetchNextPage,
    hasNextPage,
  };
}
