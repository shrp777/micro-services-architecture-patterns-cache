import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { requestId } from "hono/request-id";
import { secureHeaders } from "hono/secure-headers";
import { timeout } from "hono/timeout";
import { trimTrailingSlash } from "hono/trailing-slash";
import { aggregator } from "@routes/aggregator";
import { catalog } from "@routes/catalog";
import { orders } from "@routes/orders";

export const app = new Hono();

app.use(trimTrailingSlash());
app.use(requestId());
app.use(logger());
app.use(secureHeaders());
app.use(cors({ origin: process.env.CORS_ORIGINS ?? "*" }));
app.use(timeout(30000));

app.route("/catalog/products", aggregator);
app.route("/catalog", catalog);
app.route("/orders", orders);

app.get("/health", (c) =>
  c.json({
    success: true,
    message: process.env.API_NAME,
    version: process.env.API_VERSION,
    status: "healthy",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    uptime: Math.floor(process.uptime()) + "s"
  })
);

app.notFound((c) => c.json({ success: false, error: "Not found" }, 404));

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return c.json({ success: false, error: err.message }, err.status);
  }
  return c.json({ success: false, error: "Internal server error" }, 500);
});
