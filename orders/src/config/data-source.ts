import "reflect-metadata";
import { DataSource } from "typeorm";
import { Order } from "@entities/Order";
import { OrderItem } from "@entities/OrderItem";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST ?? "localhost",
  port: Number(process.env.DB_PORT ?? 3306),
  username: process.env.DB_USER ?? "root",
  password: process.env.DB_PASSWORD ?? "root",
  database: process.env.DB_NAME ?? "orders",
  synchronize: true,
  entities: [Order, OrderItem]
});
