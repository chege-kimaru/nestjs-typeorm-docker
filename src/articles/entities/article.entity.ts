import { BaseModel } from "../../shared/entities/base-model.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { Comment } from "./comment.entity";

@Entity('articles')
export class Article extends BaseModel {
    @Column()
    title: string;

    @Column('text',)
    content: string;

    @OneToMany(type => Comment, comment => comment.article)
    comments: Comment[];
}