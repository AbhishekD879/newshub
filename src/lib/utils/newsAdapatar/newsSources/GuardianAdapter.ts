import { Article, GuardianFilters } from "../../types";
import NewsSourceAdapter from "../NewsSourceAdapter";

export default class GuardianAdapter extends NewsSourceAdapter<GuardianFilters> {
  protected baseUrl = "https://content.guardianapis.com";
  protected sourceId = "guardian";

  constructor(protected apiKey: string) {
    super();
  }

  async fetchArticles(filters: GuardianFilters): Promise<Article[]> {
    // Construct the query parameters based on the provided filters.
    const params = new URLSearchParams({
      "api-key": this.apiKey.trim(),
      "show-fields": 'all',
      q: filters.searchQuery || "",
      ...(filters.dateFilter && filters.dateFilter.from && filters.dateFilter.to && {
        "from-date": this.formatDate(filters.dateFilter.from),
        "to-date": this.formatDate(filters.dateFilter.to),
      }),
      ...(filters.section?.length && {
        section: filters.section.join("|"),
      }),
      ...(filters.tag?.length && {
        tag: filters.tag.join("|"),
      }),
      ...(filters.orderBy && {
        "order-by": filters.orderBy,
      }),
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any = await this.fetchWithRetry(
      `${this.baseUrl}/search?${params}`
    );
    console.log("Gurdian Data", data)
    return data.response.results.map(this.transformArticle);
  }

  private formatDate(date: Date | string): string {
    if (date instanceof Date) {
      return date.toISOString().split('T')[0];
    }
    return date.split('T')[0]; // Assuming the string is already in ISO format
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private transformArticle(article: any): Article {
    return {
      id: article.id,
      title: article.webTitle,
      description: article.fields?.trailText || "",
      content: article.fields?.bodyText || "",
      author: article.fields?.byline || "",
      publishedAt: article.fields?.firstPublicationDate ? new Date(article.fields?.firstPublicationDate) : '',
      source: {
        id: "guardian",
        name: "The Guardian",
      },
      url: article.webUrl,
      imageUrl: article.fields?.thumbnail,
      category: article.sectionName || 'unknown',
    };
  }
}
