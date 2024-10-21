import { useAppDispatch, useAppSelector } from "../../lib/hooks/reduxHooks";
import {
  setMostPopular,
  setMostRecent,
  setOldest,
  resetMostPopular,
  resetMostRecent,
  resetOldest,
} from "../../lib/store/filtersSlice";

const PopularFilter = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filters);

  const filterActions = {
    "Most Recent": { set: setMostRecent, reset: resetMostRecent },
    "Most Popular": { set: setMostPopular, reset: resetMostPopular },
    "Oldest": { set: setOldest, reset: resetOldest },
  };

  const handlePopularFilterChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    filter: keyof typeof filterActions
  ) => {
    const action = e.target.checked ? filterActions[filter].set : filterActions[filter].reset;
    dispatch(action());
  };

  return (
    <div className="p-4 grid gap-4 w-40">
      {Object.keys(filterActions).map((filter) => (
        <label key={filter} className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="form-checkbox"
            checked={filters.frequentFilter.includes(filter)}
            onChange={(e) => handlePopularFilterChange(e, filter as keyof typeof filterActions)}
          />
          <span>{filter}</span>
        </label>
      ))}
    </div>
  );
};

export default PopularFilter;