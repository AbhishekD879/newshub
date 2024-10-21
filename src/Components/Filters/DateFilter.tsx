import { useAppDispatch, useAppSelector } from "../../lib/hooks/reduxHooks";
import { setFromDate, setToDate } from "../../lib/store/filtersSlice";

const DateFilter = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filters);

  const formatDate = (date: Date | null | undefined): string => {
    if (date instanceof Date && !isNaN(date.getTime())) {
      return date.toISOString().split('T')[0];
    }
    return '';
  };

  const handleFromDateFilterChange = (fromDate: string) => {
    dispatch(setFromDate(new Date(fromDate)));
  };

  const handleToDateFilterChange = (toDate: string) => {
    dispatch(setToDate(new Date(toDate)));
  };

  return (
    <div className="p-4 space-y-2">
      <label className="block">
        <span className="text-gray-700">From:</span>
        <input
          type="date"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          value={formatDate(filters.common.dateFilter?.from)}
          onChange={(e) => handleFromDateFilterChange(e.target.value)}
        />
      </label>
      <label className="block">
        <span className="text-gray-700">To:</span>
        <input
          type="date"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          value={formatDate(filters.common.dateFilter?.to)}
          onChange={(e) => handleToDateFilterChange(e.target.value)}
        />
      </label>
    </div>
  );
};

export default DateFilter;
