export interface NewsFilters {
  sources?: string[];
  dateFilter?: {
    from: Date;
    to: Date;
  };
  categoryFilter?: string[];
  authors?: string[];
  searchQuery?: string;
}

export interface CommonNewsFilters {
  dateFilter: {
    from: Date | undefined;
    to: Date | undefined;
  };
  searchQuery: string;
}

// Source-specific filters
export interface GuardianFilters extends CommonNewsFilters {
  section?: string[];
  tag?: string[];
  orderBy?: "newest" | "oldest" | "relevance";
}

export interface NYTimesFilters extends CommonNewsFilters {
  newsDesk?: string[];
  glocations?: string[];
  materialsType?: string[];
  sort?: "newest" | "oldest" | "relevance";
}

export interface NewsAPIFilters extends CommonNewsFilters {
  language?: string;
  sortBy?: "publishedAt" | "relevancy" | "popularity";
  pageSize?: number;
}

// Union type of all possible filters
export type SourceSpecificFilters = {
  guardian?: GuardianFilters;
  nytimes?: NYTimesFilters;
  newsapi?: NewsAPIFilters;
};

export interface NewsAggregatorFilters {
  sources: string[];
  common: CommonNewsFilters;
  sourceSpecific: SourceSpecificFilters;
}

export interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  author: string;
  publishedAt: Date| string;
  source: {
    id: string;
    name: string;
  };
  url: string;
  imageUrl?: string;
  category: string;
}
