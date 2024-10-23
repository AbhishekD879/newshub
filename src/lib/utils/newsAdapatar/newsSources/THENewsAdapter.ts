import { Article, THENewsFilters } from "../../types";
import NewsSourceAdapter from "../NewsSourceAdapter";

export class THENewsAdapter extends NewsSourceAdapter<THENewsFilters> {
  protected baseUrl = "https://api.thenewsapi.com/v1/news/all";
  protected sourceId = "thenews";

  constructor(protected apiKey: string) {
    super();
  }

  async fetchArticles(filters: THENewsFilters): Promise<Article[]> {
    const params = new URLSearchParams({
      api_token: this.apiKey.trim(),
      language:"en",
      ...(filters.searchQuery && { search: filters.searchQuery }),
      ...(filters.dateFilter && filters.dateFilter.from && {
        published_after: filters.dateFilter.from.toISOString(),
      }),
      ...(filters.dateFilter && filters.dateFilter.to && {
        published_before: filters.dateFilter.to.toISOString(),
      }),
      ...(filters.categories && { categories: filters.categories.join(",") }),
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any = await this.fetchWithRetry(`${this.baseUrl}?${params}`);
    console.log("THENews Data", data);

    return data.data.map(this.transformArticle);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private transformArticle(article: any): Article {
    console.log(article)
    return {
      id: article.uuid,
      title: article.title,
      description: article.description || "",
      content: article.snippet || "",
      author: article.source || "Unknown",
      publishedAt: new Date(article.published_at),
      source: {
        id: article.source,
        name: article.source,
      },
      url: article.url,
      imageUrl: article.image_url,
      category: article.categories.join(", ") || "unknown",
    };
  }
}
