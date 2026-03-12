import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { AppDataSource } from "@config/data-source";
import { Order } from "@entities/Order";

export class GetOrder {
  async handle(c: Context) {
    const id = c.req.param("id");
    const order = await AppDataSource.getRepository(Order).findOneBy({ id });
    if (!order) throw new HTTPException(404, { message: "Order not found" });
    return c.json({ success: true, message: "Order retrieved", data: order });
  }
}
