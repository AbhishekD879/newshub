import { Article, NewsAPIFilters } from "../../types";
import NewsSourceAdapter from "../NewsSourceAdapter";

export default class NewsApiAdapter extends NewsSourceAdapter<NewsAPIFilters> {
  protected baseUrl = "https://newsapi.org/v2";
  protected sourceId = "newsapi";

  constructor(protected apiKey: string) {
    super();
  }

  async fetchArticles(filters: NewsAPIFilters): Promise<Article[]> {
    const query = filters.searchQuery?.length > 0 ? filters.searchQuery : "tech";
    const params = new URLSearchParams({
      apiKey: this.apiKey.trim(),
      q: query,
      ...(filters.language && { language: filters.language }),
      ...(filters.sortBy && { sortBy: filters.sortBy }),
      ...(filters.dateFilter && filters.dateFilter.from && filters.dateFilter.to && {
        from: filters.dateFilter.from instanceof Date ? filters.dateFilter.from.toISOString() : filters.dateFilter.from,
        to: filters.dateFilter.to instanceof Date ? filters.dateFilter.to.toISOString() : filters.dateFilter.to,
      }),
      ...(filters.pageSize && { pageSize: filters.pageSize.toString() }),
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any = await this.fetchWithRetry(
      `${this.baseUrl}/everything?${params}`
    );
    console.log("NewsAPI Data", data);

    // Filter out removed articles (title is "[Removed]")
    return data.articles
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .filter((el: any) => el.title !== "[Removed]")
      .map(this.transformArticle);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private transformArticle(article: any): Article {
    return {
      id: article.url, // Use URL as unique ID
      title: article.title,
      description: article.description || "",
      content: article.content || "",
      author: article.author || "Unknown",
      publishedAt: article.publishedAt ? new Date(article.publishedAt) : "",
      source: {
        id: article.source.id || "newsapi",
        name: article.source.name,
      },
      url: article.url,
      imageUrl: article.urlToImage,
      category: "unknown", // NewsAPI does not directly provide category
    };
  }
}
