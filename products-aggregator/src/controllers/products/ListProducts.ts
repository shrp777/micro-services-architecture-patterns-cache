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

export class ListProducts {
  async handle(c: Context) {
    const cached = await redis.get("products:all");
    if (cached) {
      return c.json({ success: true, message: "Products retrieved", data: JSON.parse(cached) });
    }

    const [catalogRes, stockRes] = await Promise.all([
      fetch(`${CATALOG_URL}/products`),
      fetch(`${STOCK_URL}/stocks`, {
        headers: { Authorization: `Bearer ${STOCK_JWT_TOKEN}` }
      })
    ]);

    if (!catalogRes.ok) {
      throw new HTTPException(502, { message: "Failed to fetch products from catalog" });
    }

    const { data: products } = await catalogRes.json<{ data: Product[] }>();

    const stockByProductId = new Map<string, number>();
    if (stockRes.ok) {
      const { data: stocks } = await stockRes.json<{ data: Stock[] }>();
      for (const stock of stocks) {
        stockByProductId.set(stock.productId, stock.quantity);
      }
    }

    const data = products.map((product) => ({
      ...product,
      quantity: stockByProductId.get(product.id) ?? null
    }));

    await redis.set("products:all", JSON.stringify(data), "EX", 3600);

    return c.json({ success: true, message: "Products retrieved", data });
  }
}
