import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { AppDataSource } from "@config/data-source";
import { Product } from "@entities/Product";
import { redis } from "@config/redis";

export class UpdateProduct {
  async handle(c: Context) {
    const id = c.req.param("id");
    const repo = AppDataSource.getRepository(Product);
    const product = await repo.findOneBy({ id });
    if (!product)
      throw new HTTPException(404, { message: "Product not found" });
    const body =
      await c.req.json<
        Partial<{ name: string; description: string; price: number }>
      >();
    repo.merge(product, body);
    await repo.save(product);
    await redis.del("products:all", `products:${id}`);
    return c.json({ success: true, message: "Product updated", data: product });
  }
}
