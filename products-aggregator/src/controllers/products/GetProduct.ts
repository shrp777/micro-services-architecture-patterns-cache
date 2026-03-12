import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { redis } from "@config/redis";

const CATALOG_URL = process.env.CATALOG_URL ?? "http://catalog:3000";
const STOCK_URL = process.env.STOCK_URL ?? "http://stock:3000";
const STOCK_JWT_TOKEN = process.env.STOCK_JWT_TOKEN ?? "";

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  createdAt: string;
  updatedAt: string;
}

interface Stock {
  productId: string;
  quantity: number;
}

export class GetProduct {
  async handle(c: Context) {
    const id = c.req.param("id");

    const cached = await redis.get(`products:${id}`);
    if (cached) {
      return c.json({ success: true, message: "Product retrieved", data: JSON.parse(cached) });
    }

    const [catalogRes, stockRes] = await Promise.all([
      fetch(`${CATALOG_URL}/products/${id}`),
      fetch(`${STOCK_URL}/stocks/${id}`, {
        headers: { Authorization: `Bearer ${STOCK_JWT_TOKEN}` }
      })
    ]);

    if (catalogRes.status === 404) {
      throw new HTTPException(404, { message: "Product not found" });
    }
    if (!catalogRes.ok) {
      throw new HTTPException(502, { message: "Failed to fetch product from catalog" });
    }

    const { data: product } = (await catalogRes.json()) as { data: Product };
    let quantity: number | null = null;
    if (stockRes.ok) {
      const { data: stock } = (await stockRes.json()) as { data: Stock };
      quantity = stock.quantity;
    }

    const data = { ...product, quantity };
    await redis.set(`products:${id}`, JSON.stringify(data), "EX", 3600);

    return c.json({ success: true, message: "Product retrieved", data });
  }
}
