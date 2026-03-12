import { Hono } from "hono";
import { ListStocks } from "@controllers/stocks/ListStocks";
import { GetStock } from "@controllers/stocks/GetStock";
import { UpsertStock } from "@controllers/stocks/UpsertStock";
import { DeleteStock } from "@controllers/stocks/DeleteStock";

export const stocks = new Hono();

stocks.get("/", (c) => new ListStocks().handle(c));
stocks.get("/:productId", (c) => new GetStock().handle(c));
stocks.put("/:productId", (c) => new UpsertStock().handle(c));
stocks.delete("/:productId", (c) => new DeleteStock().handle(c));
