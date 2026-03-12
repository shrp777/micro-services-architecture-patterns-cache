import { Hono } from "hono";
import { ListProducts } from "@controllers/products/ListProducts";
import { GetProduct } from "@controllers/products/GetProduct";

export const products = new Hono();

products.get("/", (c) => new ListProducts().handle(c));
products.get("/:id", (c) => new GetProduct().handle(c));
