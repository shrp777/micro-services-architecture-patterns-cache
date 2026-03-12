import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { logger } from "hono/logger";
import { requestId } from "hono/request-id";
import { timeout } from "hono/timeout";
import { trimTrailingSlash } from "hono/trailing-slash";
import { orders } from "@routes/orders";

export const app = new Hono();

app.use(trimTrailingSlash());
app.use(requestId());
app.use(logger());
app.use(timeout(30000));

app.route("/ref", orders);

app.get("/health", (c) =>
  c.json({
    success: true,
    message: process.env.API_NAME,
    version: process.env.API_VERSION,
    status: "healthy",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    uptime: process.uptime()
  })
);

app.notFound((c) => c.json({ success: false, error: "Not found" }, 404));

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return c.json({ success: false, error: err.message }, err.status);
  }
  return c.json({ success: false, error: "Internal server error" }, 500);
});
