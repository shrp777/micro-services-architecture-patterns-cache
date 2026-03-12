import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { AppDataSource } from "@config/data-source";
import { Stock } from "@entities/Stock";

export class GetStock {
  async handle(c: Context) {
    const productId = c.req.param("productId");
    const stock = await AppDataSource.getRepository(Stock).findOneBy({ productId });
    if (!stock) throw new HTTPException(404, { message: "Stock not found" });
    return c.json({ success: true, message: "Stock retrieved", data: stock });
  }
}
