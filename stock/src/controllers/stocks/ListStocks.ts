import type { Context } from "hono";
import { AppDataSource } from "@config/data-source";
import { Stock } from "@entities/Stock";

export class ListStocks {
  async handle(c: Context) {
    const stocks = await AppDataSource.getRepository(Stock).find();
    return c.json({ success: true, message: "Stocks retrieved", data: stocks });
  }
}
