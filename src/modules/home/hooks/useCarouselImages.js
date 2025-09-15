import { useQuery } from "@tanstack/react-query";

export default function useCarouselImages({ fetchCallback, queryKeys }) {
  const { isLoading, isError, data } = useQuery({
    queryKey: queryKeys,
    queryFn: async () => await fetchCallback(),
  });

  return {
    isLoading,
    isError,
    carrousel: data,
  };
}
