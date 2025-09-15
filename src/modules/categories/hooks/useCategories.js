import { CategoryService } from "../services";
import { generateNextCursor } from "../../../lib/Pagination";
import { useInfiniteQuery } from "@tanstack/react-query";

async function fetchCategories({ parentId, page, perPage, orderBy }) {
  const category = new CategoryService();
  const categories = await category.getCategories({
    parentId,
    page,
    perPage,
    orderBy,
  });

  const nextCursor = generateNextCursor(categories.pagination);

  return {
    categories: categories.data,
    nextCursor,
  };
}

export default function useCategories({ parentId, perPage, orderBy }) {
  const { isLoading, isError, data, refetch, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["categories", parentId],
      queryFn: async ({ pageParam }) =>
        await fetchCategories({ parentId, page: pageParam, perPage, orderBy }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    });

  return {
    isLoading,
    isError,
    categories: data?.pages.flatMap((page) => page.categories) ?? [],
    refetch,
    fetchNextPage,
    hasNextPage,
  };
}
