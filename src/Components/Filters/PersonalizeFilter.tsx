import React, { useState, useEffect, useCallback } from "react";
import { useAppDispatch } from "../../lib/hooks/reduxHooks";
import { setSearchQuery, setSources } from "../../lib/store/filtersSlice";

const PersonalizeFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);

  const categories = ["Politics", "Technology", "Science", "Entertainment"];
  const sources = ["The Guardian", "BBC News", "CNN", "Reuters"];

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleSource = (source: string) => {
    setSelectedSources((prev) =>
      prev.includes(source)
        ? prev.filter((s) => s !== source)
        : [...prev, source]
    );
  };

  const applyPreferences = useCallback(
    (categories: string[], sources: string[]) => {
      const categoryQuery = categories.join(" AND ");
      dispatch(setSearchQuery(categoryQuery));

      const sourceValues = sources
        .map((source) => {
          switch (source) {
            case "The Guardian":
              return "guardian";
            case "BBC News":
            case "CNN":
            case "Reuters":
              return "newsapi";
            default:
              return "";
          }
        })
        .filter(Boolean);

      dispatch(setSources(sourceValues));
    },
    [dispatch]
  );

  const savePreferences = () => {
    const preferences = {
      categories: selectedCategories,
      sources: selectedSources,
    };

    localStorage.setItem("newsPreferences", JSON.stringify(preferences));
    applyPreferences(selectedCategories, selectedSources);

    console.log(
      "Preferences saved to local storage and applied to Redux store"
    );
  };

  useEffect(() => {
    const storedPreferences = localStorage.getItem("newsPreferences");
    if (storedPreferences) {
      const { categories, sources } = JSON.parse(storedPreferences);
      setSelectedCategories(categories);
      setSelectedSources(sources);
      applyPreferences(categories, sources);
    }
  }, [applyPreferences]);

  return (
    <div className="p-4 space-y-4 min-w-80">
      <h3 className="font-semibold text-lg">Customize Your News Feed</h3>
      <div>
        <h4 className="font-medium mb-2">Preferred Categories</h4>
        <div className="grid grid-cols-2 gap-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => toggleCategory(category)}
              />
              <span>{category}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-medium mb-2">Preferred Sources</h4>
        <div className="grid grid-cols-2 gap-2">
          {sources.map((source) => (
            <label key={source} className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={selectedSources.includes(source)}
                onChange={() => toggleSource(source)}
              />
              <span>{source}</span>
            </label>
          ))}
        </div>
      </div>
      <button
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
        onClick={savePreferences}
      >
        Save Preferences
      </button>
    </div>
  );
};

export default PersonalizeFilter;
