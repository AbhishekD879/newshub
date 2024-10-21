import { Search as SearchIcon } from "lucide-react"
import { useAppDispatch, useAppSelector } from "../lib/hooks/reduxHooks";
import { setSearchQuery } from "../lib/store/filtersSlice";
import { debounce } from "../lib/utils/debounce";
import { useCallback, useState } from "react";

const Search = () => {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector((state) => state.filters.common?.searchQuery || '');
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  const debouncedSetSearchQuery = useCallback(
    debounce((value: string) => {
      dispatch(setSearchQuery(value));
    }, 1000),
    [dispatch]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearchQuery(value);
    debouncedSetSearchQuery(value);
  };

  return (
    <div className="relative">
      <input
        type="search"
        placeholder="Search articles..."
        className="w-full pl-10 pr-4 py-2 rounded-md bg-[#34495e] text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-[#2c3e50]"
        aria-label="Search articles"
        value={localSearchQuery}
        onChange={handleSearchChange}
      />
      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300" size={18} aria-hidden="true" />
    </div>
  );
};

export default Search;