import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { AppDataSource } from "@config/data-source";
import { Stock } from "@entities/Stock";
import { redis } from "@config/redis";

export class DeleteStock {
  async handle(c: Context) {
    const productId = c.req.param("productId");
    const repo = AppDataSource.getRepository(Stock);
    const stock = await repo.findOneBy({ productId });
    if (!stock) throw new HTTPException(404, { message: "Stock not found" });
    await repo.remove(stock);
    await redis.del("products:all", `products:${productId}`);
    return c.json({ success: true, message: "Stock deleted" });
  }
}
