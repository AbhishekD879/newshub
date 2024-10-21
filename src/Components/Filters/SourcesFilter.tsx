import { useAppDispatch, useAppSelector } from "../../lib/hooks/reduxHooks";
import { setSources } from "../../lib/store/filtersSlice";

const sources = [
  { name: "The Guardian", value: "guardian" },
  { name: "Global News", value: "newsapi" },
  { name: "New York Times", value: "nytimes" },
];

const SourcesFilter = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filters);

  const handleSourceChange = (source: string, checked: boolean) => {
    const updatedSources = checked
      ? [...(filters.sources || []), source]
      : (filters.sources || []).filter((s) => s !== source);
    console.log("sources", updatedSources);
    dispatch(setSources(updatedSources));
  };

  return (
    <div className="p-4 grid lg:grid-cols-2 gap-2 min-w-52 lg:w-72">
      {sources.map((source) => (
        <label key={source.value} className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="form-checkbox"
            checked={filters.sources?.includes(source.value)}
            onChange={(e) => handleSourceChange(source.value, e.target.checked)}
          />
          <span>{source.name}</span>
        </label>
      ))}
    </div>
  );
};

export default SourcesFilter;
