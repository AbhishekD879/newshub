import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NewsAggregatorFilters } from "../utils/types";

const AdditionalState = {
  frequentFilter: [""],
};

type AdditionalStateType = typeof AdditionalState;

const initialState: NewsAggregatorFilters & AdditionalStateType = {
  sources: [],
  common: {
    searchQuery: "",
    dateFilter: {
      from: undefined,
      to: undefined,
    },
  },
  sourceSpecific: {},
  ...AdditionalState,
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilters: (
      _state,
      action: PayloadAction<NewsAggregatorFilters & AdditionalStateType>
    ) => {
      return action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      if (state.common) {
        console.log(state);
        state.common.searchQuery = action.payload;
      }
    },
    setSources: (state, action: PayloadAction<string[]>) => {
      state.sources = action.payload;
    },
    setDateFilter: (
      state,
      action: PayloadAction<{ from: Date; to: Date } | undefined>
    ) => {
      if (state.common) {
        state.common.dateFilter.from = action.payload?.from;
        state.common.dateFilter.to = action.payload?.to;
      }
    },
    setFromDate: (state, action: PayloadAction<Date>) => {
      state.common.dateFilter.from = action.payload;
    },
    setToDate: (state, action: PayloadAction<Date>) => {
      state.common.dateFilter.to = action.payload;
    },

    // Frequent Filters
    setMostPopular: (state) => {
      //  Gurdian
      if (!state.sourceSpecific.guardian) {
        state.sourceSpecific.guardian = {
          orderBy: "relevance",
          dateFilter: {
            from: state.common.dateFilter.from,
            to: state.common.dateFilter.to,
          },
          searchQuery: state.common.searchQuery,
        };
      } else {
        state.sourceSpecific.guardian.orderBy = "relevance";
      }

      // NY times
      if (!state.sourceSpecific.nytimes) {
        state.sourceSpecific.nytimes = {
          sort: "relevance",
          dateFilter: {
            from: state.common.dateFilter.from,
            to: state.common.dateFilter.to,
          },
          searchQuery: state.common.searchQuery,
        };
      } else {
        state.sourceSpecific.nytimes.sort = "relevance";
      }

      // News APi
      if (!state.sourceSpecific.newsapi) {
        state.sourceSpecific.newsapi = {
          sortBy: "popularity",
          dateFilter: {
            from: state.common.dateFilter.from,
            to: state.common.dateFilter.to,
          },
          searchQuery: state.common.searchQuery,
        };
      } else {
        state.sourceSpecific.newsapi.sortBy = "popularity";
      }
      state.frequentFilter = state.frequentFilter
        ? [...state.frequentFilter, "Most Popular"]
        : ["Most Popular"];
    },
    setMostRecent: (state) => {
      //  Gurdian
      if (!state.sourceSpecific.guardian) {
        state.sourceSpecific.guardian = {
          orderBy: "newest",
          dateFilter: {
            from: state.common.dateFilter.from,
            to: state.common.dateFilter.to,
          },
          searchQuery: state.common.searchQuery,
        };
      } else {
        state.sourceSpecific.guardian.orderBy = "newest";
      }

      // NY times
      if (!state.sourceSpecific.nytimes) {
        state.sourceSpecific.nytimes = {
          sort: "newest",
          dateFilter: {
            from: state.common.dateFilter.from,
            to: state.common.dateFilter.to,
          },
          searchQuery: state.common.searchQuery,
        };
      } else {
        state.sourceSpecific.nytimes.sort = "newest";
      }

      // News APi
      if (!state.sourceSpecific.newsapi) {
        state.sourceSpecific.newsapi = {
          sortBy: "publishedAt",
          dateFilter: {
            from: state.common.dateFilter.from,
            to: state.common.dateFilter.to,
          },
          searchQuery: state.common.searchQuery,
        };
      } else {
        state.sourceSpecific.newsapi.sortBy = "publishedAt";
      }
      state.frequentFilter = state.frequentFilter
        ? [...state.frequentFilter, "Most Recent"]
        : ["Most Recent"];
    },
    setOldest: (state) => {
      //  Gurdian
      if (!state.sourceSpecific.guardian) {
        state.sourceSpecific.guardian = {
          orderBy: "oldest",
          dateFilter: {
            from: state.common.dateFilter.from,
            to: state.common.dateFilter.to,
          },
          searchQuery: state.common.searchQuery,
        };
      } else {
        state.sourceSpecific.guardian.orderBy = "oldest";
      }

      // NY times
      if (!state.sourceSpecific.nytimes) {
        state.sourceSpecific.nytimes = {
          sort: "oldest",
          dateFilter: {
            from: state.common.dateFilter.from,
            to: state.common.dateFilter.to,
          },
          searchQuery: state.common.searchQuery,
        };
      } else {
        state.sourceSpecific.nytimes.sort = "oldest";
      }

      // News APi
      if (!state.sourceSpecific.newsapi) {
        state.sourceSpecific.newsapi = {
          sortBy: "publishedAt",
          dateFilter: {
            from: state.common.dateFilter.from,
            to: state.common.dateFilter.to,
          },
          searchQuery: state.common.searchQuery,
        };
      } else {
        state.sourceSpecific.newsapi.sortBy = "publishedAt";
      }

      state.frequentFilter = state.frequentFilter
        ? [...state.frequentFilter, "Oldest"]
        : ["Oldest"];
    },

    // Reset Frequent Filters
    resetMostPopular: (state) => {
      state.sourceSpecific.guardian = undefined;
      state.frequentFilter = state.frequentFilter.filter(
        (el) => el !== "Most Popular"
      );
    },
    resetMostRecent: (state) => {
      state.sourceSpecific.nytimes = undefined;
      state.frequentFilter = state.frequentFilter.filter(
        (el) => el !== "Most Recent"
      );
    },
    resetOldest: (state) => {
      state.sourceSpecific.guardian = undefined;
      state.frequentFilter = state.frequentFilter.filter(
        (el) => el !== "Oldest"
      );
    },
  },
});

export const {
  setFilters,
  setSearchQuery,
  setSources,
  setDateFilter,
  setFromDate,
  setToDate,
  setMostPopular,
  setMostRecent,
  setOldest,
  resetMostPopular,
  resetMostRecent,
  resetOldest,
} = filtersSlice.actions;
export default filtersSlice.reducer;
