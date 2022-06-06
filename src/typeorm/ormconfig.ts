import 'dotenv/config';
import { DataSource } from 'typeorm';

const { DB_USERNAME, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT, DB_URL } = process.env;

const dataSource = new DataSource({
    type: 'postgres',
    // Using url as a hack for docker
    url: DB_URL,
    // username: DB_USERNAME,
    // password: DB_PASSWORD,
    // port: +DB_PORT,
    // host: DB_HOST,
    // database: DB_NAME,
    logging: true,
    // entities: ['dist/**/*.entity{ .ts,.js}'],
    migrationsTableName: "migrations",
    migrations: ['src/typeorm/migrations/*{.ts,.js}'],
    migrationsRun: false,
    synchronize: false,
});

export default dataSource;