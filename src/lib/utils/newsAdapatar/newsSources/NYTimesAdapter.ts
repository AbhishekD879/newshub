import { Article, NYTimesFilters } from "../../types";
import NewsSourceAdapter from "../NewsSourceAdapter";

export class NYTimesAdapter extends NewsSourceAdapter<NYTimesFilters> {
  protected baseUrl = "https://api.nytimes.com/svc/search/v2";
  protected sourceId = "nytimes";

  constructor(protected apiKey: string) {
    super();
  }

  private formatDate(date: Date | string): string {
    if (date instanceof Date) {
      return date.toISOString().slice(0, 10);
    }
    return date.slice(0, 10); // Assuming the string is already in ISO format
  }

  async fetchArticles(filters: NYTimesFilters): Promise<Article[]> {
    const params = new URLSearchParams({
      "api-key": this.apiKey.trim(),
      q: filters.searchQuery || "",
      ...(filters.dateFilter && filters.dateFilter.from && filters.dateFilter.to && {
        begin_date: this.formatDate(filters.dateFilter.from),
        end_date: this.formatDate(filters.dateFilter.to),
      }),
      ...(filters.newsDesk?.length && {
        fq: `news_desk:(${filters.newsDesk.join(" OR ")})`,
      }),
      ...(filters.glocations?.length && {
        fq: `glocations:(${filters.glocations.join(" OR ")})`,
      }),
      ...(filters.sort && {
        sort: filters.sort,
      }),
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any = await this.fetchWithRetry(
      `${this.baseUrl}/articlesearch.json?${params}`
    );
    console.log("Ny Times Data", data);
    return data.response.docs.map(this.transformArticle);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private transformArticle(article: any): Article {
    return {
      id: article._id,
      title: article.abstract,
      description: article.lead_paragraph || "",
      content: article.snippet || "",
      author: article.byline.original || "",
      publishedAt: new Date(article.pub_date),
      source: {
        id: "nytimes",
        name: "New Your Times",
      },
      url: article.web_url,
      imageUrl: `https://www.nytimes.com/${article.multimedia[0].url}`,
      category: article.section_name || "unknown",
    };
  }
  // ... other methods remain the same
}
