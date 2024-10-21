import { Article, CommonNewsFilters} from "../types";

abstract class NewsSourceAdapter<T extends CommonNewsFilters> {
    protected abstract baseUrl: string;
    protected abstract apiKey: string;
    protected abstract sourceId: string;
  
    abstract fetchArticles(filters: T): Promise<Article[]>;
  
    protected async fetchWithRetry(url: string, options: RequestInit = {}, retries = 3): Promise<unknown> {
      let lastError: Error | null = null;
      
      for (let i = 0; i < retries; i++) {
        try {
          const response = await fetch(url, options);
          if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
          return await response.json();
        } catch (error) {
          lastError = error as Error;
          if (i === retries - 1) break;
          await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, i)));
        }
      }
      
      throw lastError;
    }
  }

export default NewsSourceAdapter