import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticleDto } from './dto/article.dto';
import { CommentDto } from './dto/comment.dto';

@Controller('articles')
export class ArticlesController {
    constructor(private articleService: ArticlesService) { }

    @Post()
    createArticle(@Body() data: ArticleDto) {
        return this.articleService.create(data);
    }

    @Get()
    getArticles() {
        return this.articleService.findAll();
    }

    @Put(':articleId')
    updateArticle(@Param('articleId') artcileId: string, @Body() data: ArticleDto) {
        return this.articleService.update(artcileId, data);
    }

    @Delete(':articleId')
    deleteArticle(@Param('articleId') articleId: string) {
        return this.articleService.delete(articleId);
    }

    @Post(':articleId/comments')
    addArticleComment(@Param('articleId') articleId: string, @Body() data: CommentDto) {
        return this.articleService.addComment(articleId, data);
    }

    @Get(':articleId/comments')
    getArticleComments(@Param('articleId') articleId: string) {
        return this.articleService.getArticleComments(articleId);
    }
}
