import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleDto } from './dto/article.dto';
import { CommentDto } from './dto/comment.dto';
import { Article } from './entities/article.entity';
import { Comment } from './entities/comment.entity';

@Injectable()
export class ArticlesService {
    constructor(
        @InjectRepository(Article) private articleRepository: Repository<Article>,
        @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    ) { }

    create(articleDto: ArticleDto) {
        return this.articleRepository.insert(articleDto);
    }

    findAll(): Promise<Article[]> {
        return this.articleRepository.find();
    }

    update(articleId: string, articleDto: ArticleDto) {
        return this.articleRepository.update(articleId, articleDto);
    }

    delete(articleId: string) {
        return this.articleRepository.delete(articleId);
    }

    async addComment(articleId: string, commentDto: CommentDto) {
        // const article = await this.articleRepository.findOneBy({id: articleId});
        // if (!article) throw new BadRequestException('Invalid article');

        // const comment = this.commentRepository.create(commentDto);
        // comment.article = article;

        // return this.commentRepository.save(comment);
        return this.commentRepository.insert({
            ...commentDto,
            articleId
        });
    }

    getArticleComments(articleId: string) {
        return this.commentRepository.findBy({ articleId })
    }

}
