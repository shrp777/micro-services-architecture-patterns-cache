import { Hono } from "hono";

const ORDERS_URL = process.env.ORDER_PROCESSOR_URL ?? "http://order-processor:3000";

export const orders = new Hono();

orders.all("/*", async (c) => {
  const url = new URL(c.req.url);
  const target = `${ORDERS_URL}${url.pathname.replace(/^\/orders/, "")}${url.search}`;
  const upstream = await fetch(target, {
    method: c.req.method,
    headers: c.req.raw.headers,
    body: ["GET", "HEAD"].includes(c.req.method) ? undefined : c.req.raw.body,
  });
  return new Response(upstream.body, { status: upstream.status, headers: upstream.headers });
});
