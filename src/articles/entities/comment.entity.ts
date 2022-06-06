import { BaseModel } from "../../shared/entities/base-model.entity";
import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { Article } from "./article.entity";

@Entity('comments')
export class Comment extends BaseModel {
    @Column({ name: 'article_id' })
    articleId: string

    @ManyToOne(type => Article, article => article.comments)
    @JoinColumn({ name: 'article_id' })
    article: Article;

    @Column('text')
    content: string;
}