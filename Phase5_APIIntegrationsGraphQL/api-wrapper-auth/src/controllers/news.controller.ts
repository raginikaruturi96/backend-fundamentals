import { Request, Response } from 'express';
import { Controller } from '../decorators/controller';
import { Get } from '../decorators/route';
import { NewsService } from '../services/news.service';

@Controller('/news')
export class NewsController {
  private newsService = new NewsService();

  @Get('/top')
  async getTop(req: Request, res: Response) {
    try {
      const country = (req.query.country as string) || 'us';
      const data = await this.newsService.getTopHeadlines(country);
      res.json(data);
    } catch (error: any) {
      res.status(500).json({
        message: 'Failed to fetch headlines',
        error: error.response?.data || error.message,
      });
    }
  }

  @Get('/search')
  async search(req: Request, res: Response) {
    try {
      const query = req.query.q as string;
      const data = await this.newsService.searchNews(query);
      res.json(data);
    } catch (error: any) {
      res.status(500).json({
        message: 'Failed to search news',
        error: error.response?.data || error.message,
      });
    }
  }
}
