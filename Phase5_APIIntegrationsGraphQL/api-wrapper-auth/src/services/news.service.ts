import axios from 'axios';

export class NewsService {
  private baseUrl = 'https://newsapi.org/v2';

  async getTopHeadlines(country: string = 'us') {
    const response = await axios.get(`${this.baseUrl}/top-headlines`, {
      params: { country },
      headers: {
        'X-Api-Key': process.env.NEWS_API_KEY as string,
      },
    });

    return this.transform(response.data);
  }

  async searchNews(query: string) {
    const response = await axios.get(`${this.baseUrl}/everything`, {
      params: { q: query },
      headers: {
        'X-Api-Key': process.env.NEWS_API_KEY as string,
      },
    });

    return this.transform(response.data);
  }

  private transform(data: any) {
    return {
      totalResults: data.totalResults,
      articles: data.articles.map((article: any) => ({
        title: article.title,
        source: article.source.name,
        author: article.author,
        publishedAt: article.publishedAt,
        url: article.url,
      })),
    };
  }
}
