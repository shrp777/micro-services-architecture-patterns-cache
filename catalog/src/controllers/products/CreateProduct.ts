import type { Context } from "hono";
import { AppDataSource } from "@config/data-source";
import { Product } from "@entities/Product";
import { redis } from "@config/redis";

export class CreateProduct {
  async handle(c: Context) {
    const body = await c.req.json<{
      name: string;
      description?: string;
      price: number;
    }>();
    const product = AppDataSource.getRepository(Product).create(body);
    await AppDataSource.getRepository(Product).save(product);
    await redis.del("products:all");
    return c.json(
      { success: true, message: "Product created", data: product },
      201
    );
  }
}
