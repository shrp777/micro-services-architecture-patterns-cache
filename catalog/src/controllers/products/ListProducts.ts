import type { Context } from "hono";
import { AppDataSource } from "@config/data-source";
import { Product } from "@entities/Product";

export class ListProducts {
  async handle(c: Context) {
    const products = await AppDataSource.getRepository(Product).find();
    return c.json({ success: true, message: "Products retrieved", data: products });
  }
}
