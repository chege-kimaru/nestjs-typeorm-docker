import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { ArticleDto } from './dto/article.dto';
jest.mock('./articles.service.ts');

describe('ArticlesController', () => {
  let controller: ArticlesController;
  let service: ArticlesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticlesController],
      providers: [
        ArticlesService
      ]
    }).compile();

    controller = module.get<ArticlesController>(ArticlesController);
    service = module.get<ArticlesService>(ArticlesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call the service', () => {
    const article: ArticleDto = { title: 'Test Article 1', content: 'Test Article 1 Test' };
    controller.createArticle(article);

    expect(service.create).toHaveBeenCalled();
  });
});
