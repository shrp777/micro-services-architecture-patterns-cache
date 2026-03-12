import type { Context } from "hono";
import { AppDataSource } from "@config/data-source";
import { Stock } from "@entities/Stock";
import { redis } from "@config/redis";

export class UpsertStock {
  async handle(c: Context) {
    const productId = c.req.param("productId");
    const { quantity } = await c.req.json<{ quantity: number }>();
    const repo = AppDataSource.getRepository(Stock);
    let stock = await repo.findOneBy({ productId });
    if (stock) {
      stock.quantity = quantity;
    } else {
      stock = repo.create({ productId, quantity });
    }
    await repo.save(stock);
    await redis.del("products:all", `products:${productId}`);
    return c.json({ success: true, message: "Stock updated", data: stock });
  }
}
