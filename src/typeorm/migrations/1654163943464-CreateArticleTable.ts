import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateArticleTable1654163943464 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // this ensure we can use default: `uuid_generate_v4()`
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

        await queryRunner.createTable(
            new Table({
                name: 'articles',
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
                        name: 'title',
                        type: 'varchar',
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
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('articles', true);
    }

}
