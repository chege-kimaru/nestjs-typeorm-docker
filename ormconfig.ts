import { DataSource } from "typeorm";

const connectionSource = new DataSource({
  "name": "default",
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "postgres",
  "password": "keinkimaru",
  "database": "nest_typeorm",
  "entities": ["dist/**/*.entity{ .ts,.js}"],
  "synchronize": false,
  "migrations": ["dist/typeorm/migrations/*{.ts,.js}"],
  "migrationsTableName": "migrations",
  "migrationsRun": true,
});

export default connectionSource;