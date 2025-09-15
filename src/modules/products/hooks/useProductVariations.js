import { generateNextCursor } from "../../../lib/Pagination";
import { ProductVariationDTO } from "../dto";
import { ProductService } from "../services";
import { useInfiniteQuery } from "@tanstack/react-query";

async function fetchProductVariations({ page, perPage, productId }) {
  const productService = new ProductService();
  const products = await productService.getProductVariations({
    page,
    perPage,
    productId,
  });

  const nextCursor = generateNextCursor(products.pagination);

  return {
    products: products.data,
    nextCursor,
  };
}

/**
 * The state and functions for managing product variations.
 * @typedef {Object} UseProductVariations
 *
 * @property {boolean} isLoading - Indicates whether the data is currently loading.
 * @property {boolean} isError - Indicates whether there was an error fetching the data.
 * @property {Array<ProductVariationDTO>} products - List of product variations.
 * @property {function} refetch - Function to refetch the data.
 * @property {function} fetchNextPage - Function to fetch the next page of data.
 * @property {boolean} hasNextPage - True if there is another page to fetch; false otherwise.
 */

/**
 * A custom hook that fetches product variations using infinite scrolling.
 *
 * @param {Object} options - Options for fetching product variations.
 * @param {number} options.perPage - The number of items to fetch per page.
 * @param {string} options.productId - The ID of the product for which variations are fetched.
 *
 * @returns {UseProductVariations} - The state and functions for managing product variations.
 */
export function useProductVariations({ perPage, productId }) {
  /**
   *  staleTime and gcTime are set to 0 to ensure that the data is always fresh.
   */
  const {
    isLoading,
    isError,
    data,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["product", productId, "variations"],
    queryFn: async ({ pageParam }) =>
      await fetchProductVariations({ page: pageParam, perPage, productId }),
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
    isFetchingNextPage,
    hasNextPage,
  };
}
