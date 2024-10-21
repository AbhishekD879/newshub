import { useQuery } from "@tanstack/react-query";
import { NewsAggregatorFilters } from "../utils/types";
import newsAggregator from "../utils/newsAdapatar";

export function useNews(filters: NewsAggregatorFilters) {
  return useQuery({
    queryKey: ["news", filters],
    queryFn: () => newsAggregator.fetchNews(filters),
    staleTime: 5 * 60 * 1000,
  });
}
