import type { Context } from "hono";
import { AppDataSource } from "@config/data-source";
import { Order } from "@entities/Order";

export class ListOrders {
  async handle(c: Context) {
    const orders = await AppDataSource.getRepository(Order).find();
    return c.json({ success: true, message: "Orders retrieved", data: orders });
  }
}
