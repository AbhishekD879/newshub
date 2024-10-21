import { useState } from "react";
import FilterPill from "./FilterPill";
import { Filter, Clock, Globe, User, Tag } from "lucide-react";
import DateFilter from "./Filters/DateFilter";
import PopularFilter from "./Filters/PopularFilter";
import SourcesFilter from "./Filters/SourcesFilter";
import CategoryFilter from "./Filters/CategoryFilter";
import PersonalizeFilter from "./Filters/PersonalizeFilter";

const FilterContainer = () => {
  const [expandedPill, setExpandedPill] = useState<string | null>(null);

  const togglePill = (pill: string) => {
    setExpandedPill(expandedPill === pill ? null : pill);
  };

  return (
    <div className="mb-6 flex flex-wrap justify-between items-start mx-4">
      <div className="flex flex-wrap gap-2 mb-2 sm:mb-0">
        <FilterPill
          label="Filter"
          icon={<Filter size={16} />}
          expanded={expandedPill === "filter"}
          onClick={() => togglePill("filter")}
        >
          <PopularFilter />
        </FilterPill>

        <FilterPill
          label="Date"
          expanded={expandedPill === "date"}
          onClick={() => togglePill("date")}
          icon={<Clock size={16} />}
        >
          <DateFilter />
        </FilterPill>

        <FilterPill
          label="Category"
          expanded={expandedPill === "category"}
          onClick={() => togglePill("category")}
          icon={<Tag size={16} />}
        >
          <CategoryFilter />
        </FilterPill>

        <FilterPill
          label="Source"
          expanded={expandedPill === "source"}
          onClick={() => togglePill("source")}
          icon={<Globe size={16} />}
        >
          <SourcesFilter />
        </FilterPill>
      </div>

      <FilterPill
        label="Personalize Feed"
        icon={<User size={16} />}
        expanded={expandedPill === "personalize"}
        onClick={() => togglePill("personalize")}
        className="bg-blue-500"
        childWrapperClassName="lg:right-0"
      >
        <PersonalizeFilter />
      </FilterPill>
    </div>
  );
};

export default FilterContainer;
