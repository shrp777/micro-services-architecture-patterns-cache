import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";

const CATALOG_URL = process.env.CATALOG_URL ?? "http://catalog:3000";
const ORDERS_URL = process.env.ORDERS_URL ?? "http://orders:3000";

interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

interface CreateOrderBody {
  items: OrderItem[];
}

interface CatalogProduct {
  id: string;
  name: string;
  price: number;
}

export class CreateOrder {
  async handle(c: Context) {
    const body = await c.req.json<CreateOrderBody>();

    for (const item of body.items) {
      const res = await fetch(`${CATALOG_URL}/products/${item.productId}`);
      if (!res.ok) {
        throw new HTTPException(422, {
          message: `Product ${item.productId} not found in catalog`,
        });
      }
      const { data: product } = await res.json<{ data: CatalogProduct }>();
      if (Number(product.price) !== Number(item.price)) {
        throw new HTTPException(422, {
          message: `Price mismatch for product ${item.productId}: expected ${product.price}, got ${item.price}`,
        });
      }
    }

    const res = await fetch(`${ORDERS_URL}/ref`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return c.json(data, res.status as Parameters<typeof c.json>[1]);
  }
}
