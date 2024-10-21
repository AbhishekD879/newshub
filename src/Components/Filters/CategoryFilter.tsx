import React from "react";
import { useAppDispatch, useAppSelector } from "../../lib/hooks/reduxHooks";
import { setSearchQuery } from "./../../lib/store/filtersSlice";

const categories = [
  "Politics",
  "Technology",
  "Science",
  "Entertainment",
  "Sports",
  "Health",
];

const CategoryFilter: React.FC = () => {
  const filters = useAppSelector((state) => state.filters);
  const dispatch = useAppDispatch();
  const handleCategoryChange = (category: string, checked: boolean) => {
    let categories = filters.common.searchQuery.split(" AND ").filter(Boolean);

    if (checked) {
      // Add the category if it's not already present
      if (!categories.includes(category)) {
        categories.push(category);
      }
    } else {
      // Remove the category if it's present
      categories = categories.filter((cat) => cat !== category);
    }

    // Join the categories with " AND " and dispatch the new query
    const newQuery = categories.join(" AND ");
    dispatch(setSearchQuery(newQuery));
  };
  console.log("Filter Search Query", filters.common.searchQuery);
  return (
    <div className="p-4 grid lg:grid-cols-2 gap-2 sm:w-40 lg:w-72">
      {categories.map((category) => (
        <label key={category} className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="form-checkbox"
            checked={filters.common.searchQuery?.includes(category)}
            onChange={(e) => handleCategoryChange(category, e.target.checked)}
          />
          <span>{category}</span>
        </label>
      ))}
    </div>
  );
};

export default CategoryFilter;
