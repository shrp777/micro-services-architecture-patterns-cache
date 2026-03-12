import { Hono } from "hono";
import { ListOrders } from "@controllers/orders/ListOrders";
import { GetOrder } from "@controllers/orders/GetOrder";
import { CreateOrder } from "@controllers/orders/CreateOrder";

export const orders = new Hono();

orders.get("/", (c) => new ListOrders().handle(c));
orders.get("/:id", (c) => new GetOrder().handle(c));
orders.post("/", (c) => new CreateOrder().handle(c));
