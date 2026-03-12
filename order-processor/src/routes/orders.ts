import { Hono } from "hono";
import { CreateOrder } from "@controllers/orders/CreateOrder";

const ORDERS_URL = process.env.ORDERS_URL ?? "http://orders:3000";

export const orders = new Hono();

orders.post("/", (c) => new CreateOrder().handle(c));

orders.all("/*", async (c) => {
  const url = new URL(c.req.url);
  const target = `${ORDERS_URL}${url.pathname}${url.search}`;
  const upstream = await fetch(target, {
    method: c.req.method,
    headers: c.req.raw.headers,
    body: ["GET", "HEAD"].includes(c.req.method) ? undefined : c.req.raw.body,
  });
  return new Response(upstream.body, { status: upstream.status, headers: upstream.headers });
});
