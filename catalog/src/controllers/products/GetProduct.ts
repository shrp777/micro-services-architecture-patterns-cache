import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { AppDataSource } from "@config/data-source";
import { Product } from "@entities/Product";

export class GetProduct {
  async handle(c: Context) {
    const id = c.req.param("id");
    const product = await AppDataSource.getRepository(Product).findOneBy({
      id
    });
    if (!product)
      throw new HTTPException(404, { message: "Product not found" });
    return c.json({
      success: true,
      message: "Product retrieved",
      data: product
    });
  }
}
