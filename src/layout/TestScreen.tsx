import ArticleGrid from "../Components/ArticleGrid";
import SkeletonArticleGrid from "../Components/Skeleton";
import { useNews } from "../lib/hooks/useNews";
import { useAppSelector } from "../lib/hooks/reduxHooks";
import FilterContainer from "../Components/FilterContainer";
import { useMemo, useState, useEffect } from "react";
import { debounce } from "../lib/utils/debounce";

export default function TestScreen() {
  const filters = useAppSelector((state) => state.filters);
  const [debouncedFilters, setDebouncedFilters] = useState(filters);

  const debouncedSetFilters = useMemo(
    () => debounce((newFilters) => setDebouncedFilters(newFilters), 2500),
    []
  );

  useEffect(() => {
    debouncedSetFilters(filters);
  }, [filters, debouncedSetFilters]);

  const { data, isPending, error } = useNews(debouncedFilters);

  if (isPending) return <SkeletonArticleGrid />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div>
        <div className="container mx-auto mt-4">
          <FilterContainer />
        </div>
        <ArticleGrid articles={data} />
      </div>
    </>
  );
}
