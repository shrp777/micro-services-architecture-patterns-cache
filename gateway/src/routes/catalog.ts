import { Hono } from "hono";

const CATALOG_URL = process.env.CATALOG_URL ?? "http://catalog:3000";

export const catalog = new Hono();

catalog.all("/*", async (c) => {
  const url = new URL(c.req.url);
  const target = `${CATALOG_URL}${url.pathname.replace(/^\/catalog/, "")}${url.search}`;
  const upstream = await fetch(target, {
    method: c.req.method,
    headers: c.req.raw.headers,
    body: ["GET", "HEAD"].includes(c.req.method)
      ? undefined
      : c.req.raw.body
  });
  return new Response(upstream.body, {
    status: upstream.status,
    headers: upstream.headers
  });
});
