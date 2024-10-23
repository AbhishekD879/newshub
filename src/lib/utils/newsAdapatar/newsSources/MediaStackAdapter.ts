import { Article, MediaStackFilters } from "../../types";
import NewsSourceAdapter from "../NewsSourceAdapter";

export class MediaStackAdapter extends NewsSourceAdapter<MediaStackFilters> {
  protected baseUrl = "https://api.mediastack.com/v1/news";
  protected sourceId = "mediastack";

  constructor(protected apiKey: string) {
    super();
  }

  async fetchArticles(filters: MediaStackFilters): Promise<Article[]> {
    const params = new URLSearchParams({
      access_key: this.apiKey.trim(),
      ...(filters.date && { date: filters.date }),
      ...(filters.sources && { sources: filters.sources.join(",") }),
      ...(filters.categories && { categories: filters.categories.join(",") }),
      ...(filters.countries && { countries: filters.countries.join(",") }),
      ...(filters.languages && { languages: filters.languages.join(",") }),
      ...(filters.keywords && { keywords: filters.keywords.join(",") }),
      ...(filters.sort && { sort: filters.sort }),
      ...(filters.limit && { limit: filters.limit.toString() }),
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any = await this.fetchWithRetry(`${this.baseUrl}?${params}`);
    console.log("MediaStack Data", data);

    return data.data.map(this.transformArticle).filter((obj:Article, index:number, self:Article[]) => {
        return self.findIndex((o) => o.title === obj.title) === index;
      });;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private transformArticle(article: any): Article {
    return {
      id: article.url,
      title: article.title,
      description: article.description || "",
      content: article.content || "",
      author: article.author || "Unknown",
      publishedAt: new Date(article.published_at),
      source: {
        id: article.source || "mediastack",
        name: article.source,
      },
      url: article.url,
      imageUrl: article.image || "",
      category: article.category || "unknown",
    };
  }
}
