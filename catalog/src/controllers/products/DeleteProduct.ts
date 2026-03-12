import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { AppDataSource } from "@config/data-source";
import { Product } from "@entities/Product";
import { redis } from "@config/redis";

export class DeleteProduct {
  async handle(c: Context) {
    const id = c.req.param("id");
    const repo = AppDataSource.getRepository(Product);
    const product = await repo.findOneBy({ id });
    if (!product)
      throw new HTTPException(404, { message: "Product not found" });
    await repo.remove(product);
    await redis.del("products:all", `products:${id}`);
    return c.json({ success: true, message: "Product deleted" });
  }
}
