import "reflect-metadata";
import { DataSource } from "typeorm";
import { Stock } from "@entities/Stock";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST ?? "localhost",
  port: Number(process.env.DB_PORT ?? 3306),
  username: process.env.DB_USER ?? "root",
  password: process.env.DB_PASSWORD ?? "root",
  database: process.env.DB_NAME ?? "stock",
  synchronize: true,
  entities: [Stock]
});
