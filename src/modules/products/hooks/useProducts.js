import { generateNextCursor } from "../../../lib/Pagination";
import { ProductService } from "../services";
import { useInfiniteQuery } from "@tanstack/react-query";

async function fetchProducts({ category, page, perPage, orderBy }) {
  const productService = new ProductService();
  const products = await productService.getProducts({
    category,
    page,
    perPage,
    orderBy,
  });

  const nextCursor = generateNextCursor(products.pagination);

  return {
    products: products.data,
    nextCursor,
  };
}

export default function useProducts({ category, perPage, orderBy }) {
  /**
   *  staleTime and gcTime are set to 0 to ensure that the data is always fresh.
   */
  const { isLoading, isError, data, refetch, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["products", category],
      queryFn: async ({ pageParam }) =>
        await fetchProducts({ category, page: pageParam, perPage, orderBy }),
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
