import { Hono } from "hono";

const AGGREGATOR_URL = process.env.AGGREGATOR_URL ?? "http://products-aggregator:3000";

export const aggregator = new Hono();

aggregator.get("/", async (c) => {
  const url = new URL(c.req.url);
  const upstream = await fetch(`${AGGREGATOR_URL}/products${url.search}`);
  return new Response(upstream.body, {
    status: upstream.status,
    headers: upstream.headers
  });
});

aggregator.get("/:id", async (c) => {
  const id = c.req.param("id");
  const upstream = await fetch(`${AGGREGATOR_URL}/products/${id}`);
  return new Response(upstream.body, {
    status: upstream.status,
    headers: upstream.headers
  });
});
