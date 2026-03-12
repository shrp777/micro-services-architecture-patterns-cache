import { Hono } from "hono";
import { ListProducts } from "@controllers/products/ListProducts";
import { GetProduct } from "@controllers/products/GetProduct";
import { CreateProduct } from "@controllers/products/CreateProduct";
import { UpdateProduct } from "@controllers/products/UpdateProduct";
import { DeleteProduct } from "@controllers/products/DeleteProduct";

export const products = new Hono();

products.get("/", (c) => new ListProducts().handle(c));
products.get("/:id", (c) => new GetProduct().handle(c));
products.post("/", (c) => new CreateProduct().handle(c));
products.put("/:id", (c) => new UpdateProduct().handle(c));
products.delete("/:id", (c) => new DeleteProduct().handle(c));
