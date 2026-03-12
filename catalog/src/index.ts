import { app } from "./app";
import { AppDataSource } from "@config/data-source";

await AppDataSource.initialize();

const PORT = Number(process.env.PORT ?? 3000);

export default { port: PORT, fetch: app.fetch };
