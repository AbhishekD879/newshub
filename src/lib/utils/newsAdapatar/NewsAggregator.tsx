import { Article, NewsAggregatorFilters, SourceSpecificFilters } from "../types";
import GuardianAdapter from "./newsSources/GuardianAdapter";
import NewsSourceAdapter from "./NewsSourceAdapter";
import { NYTimesAdapter } from "./newsSources/NYTimesAdapter";
import NewsApiAdapter from "./newsSources/NewsApiAdapter";

export class NewsAggregator {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private adapters: Map<string, NewsSourceAdapter<any>> = new Map();
  
    constructor(apiKeys: Record<string, string>) {
      if (apiKeys.guardian) {
        this.adapters.set('guardian', new GuardianAdapter(apiKeys.guardian.trim()));
      }
      if (apiKeys.nytimes) {
        this.adapters.set('nytimes', new NYTimesAdapter(apiKeys.nytimes.trim()));
      }
      if(apiKeys.newsapi){
        this.adapters.set('newsapi', new NewsApiAdapter(apiKeys.newsapi.trim()));
      }
    }
  
    async fetchNews(filters: NewsAggregatorFilters): Promise<Article[]> {
      const sourcesToFetch = filters.sources?.length
        ? filters.sources
        : Array.from(this.adapters.keys());
  
      const articlePromises = sourcesToFetch
        .filter(source => this.adapters.has(source))
        .map(source => {
          const adapter = this.adapters.get(source)!;
          // Combine common filters with source-specific filters
          const sourceFilters = {
            ...filters.common,
            ...filters.sourceSpecific?.[source as keyof SourceSpecificFilters]
          };
          return adapter.fetchArticles(sourceFilters);
        });
  
      const articles = await Promise.allSettled(articlePromises);
      console.log("Articles",articles)
      return articles
        .filter((result): result is PromiseFulfilledResult<Article[]> => 
          result.status === 'fulfilled'
        )
        .flatMap(result => result.value)
        .sort((a, b) => {
            if(!a.publishedAt || b.publishedAt || !( typeof a.publishedAt === "object") || !( typeof b.publishedAt === "object")){
                return 0;
            }else{
                if (typeof a.publishedAt === 'string' && typeof b.publishedAt === 'string') {
                    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
                }
                return 0;
            }
        });
    }
  }