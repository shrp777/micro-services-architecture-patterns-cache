import type { Context } from "hono";
import { AppDataSource } from "@config/data-source";
import { Order } from "@entities/Order";
import { OrderItem } from "@entities/OrderItem";

interface CreateOrderBody {
  items: { productId: number; quantity: number; price: number }[];
}

export class CreateOrder {
  async handle(c: Context) {
    const body = await c.req.json<CreateOrderBody>();
    const items = body.items.map((i) =>
      AppDataSource.getRepository(OrderItem).create(i)
    );
    const total = items.reduce(
      (sum, i) => sum + Number(i.price) * i.quantity,
      0
    );
    const order = AppDataSource.getRepository(Order).create({ items, total });
    await AppDataSource.getRepository(Order).save(order);
    return c.json(
      { success: true, message: "Order created", data: order },
      201
    );
  }
}
