import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateCommentTable1654171484949 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'comments',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        isUnique: true,
                        generationStrategy: 'uuid',
                        default: `uuid_generate_v4()`
                    },
                    {
                        name: 'article_id',
                        type: 'uuid',
                        isNullable: false
                    },
                    {
                        name: 'content',
                        type: 'text',
                        isNullable: false
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        isNullable: false,
                        default: `CURRENT_TIMESTAMP`
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        isNullable: false,
                        default: `CURRENT_TIMESTAMP`,
                        onUpdate: `CURRENT_TIMESTAMP`
                    }
                ]
            }),
            true
        );

        await queryRunner.createForeignKey(
            "comments",
            new TableForeignKey({
                columnNames: ["article_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "articles",
                onDelete: "RESTRICT",
                onUpdate: "RESTRICT"
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('comments', true);
    }

}
