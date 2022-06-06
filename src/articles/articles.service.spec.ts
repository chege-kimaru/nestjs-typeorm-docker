import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesService } from './articles.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Comment } from './entities/comment.entity';
import { ArticleDto } from './dto/article.dto';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

// @ts-ignore
export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  findOne: jest.fn(entity => entity),
  insert: jest.fn(entity => entity),
  find: jest.fn(_ => _),
}));

describe('ArticlesService', () => {
  let service: ArticlesService;
  let articleRepositoryMock: MockType<Repository<Article>>;
  let commentRepositoryMock: MockType<Repository<Comment>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArticlesService,

        // Provide your mock instead of the actual repository
        { provide: getRepositoryToken(Article), useFactory: repositoryMockFactory },
        { provide: getRepositoryToken(Comment), useFactory: repositoryMockFactory },
      ],
    }).compile();

    service = module.get<ArticlesService>(ArticlesService);
    articleRepositoryMock = module.get(getRepositoryToken(Article));
    commentRepositoryMock = module.get(getRepositoryToken(Comment));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should save article', () => {
    const articleDto: ArticleDto = { title: 'Article 1', content: 'Article 1 Content' };

    // Now you can control the return value of your mock's methods
    // articleRepositoryMock.insert.mockReturnValue(article);

    // expect(service.create(article)).toEqual(article);
    service.create(articleDto);

    // And make assertions on how often and with what params your mock's methods are called
    expect(articleRepositoryMock.insert).toHaveBeenCalledWith(articleDto);
  });

  it('should find articles', () => {
    const articles = [
      { title: 'Article 1', content: 'Article 1 Content' },
      { title: 'Article 2', content: 'Article 2 Content' },
    ];

    // Now you can control the return value of your mock's methods
    articleRepositoryMock.find.mockReturnValue(articles);

    expect(service.findAll()).toEqual(articles);

    expect(articleRepositoryMock.find).toHaveBeenCalled();
  })
});
