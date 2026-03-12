import { AppDataSource } from "@config/data-source";
import { Stock } from "@entities/Stock";

await AppDataSource.initialize();

const repo = AppDataSource.getRepository(Stock);

await repo.createQueryBuilder().delete().execute();

await repo.save([
  { productId: "a1b2c3d4-0001-4000-8000-000000000001", quantity: 42 },
  { productId: "a1b2c3d4-0001-4000-8000-000000000002", quantity: 17 },
  { productId: "a1b2c3d4-0001-4000-8000-000000000003", quantity: 8 },
  { productId: "a1b2c3d4-0001-4000-8000-000000000004", quantity: 25 },
  { productId: "a1b2c3d4-0001-4000-8000-000000000005", quantity: 3 },
  { productId: "a1b2c3d4-0001-4000-8000-000000000006", quantity: 56 },
  { productId: "a1b2c3d4-0001-4000-8000-000000000007", quantity: 11 },
  { productId: "a1b2c3d4-0001-4000-8000-000000000008", quantity: 0 },
]);

console.log("Stock seeded successfully");

await AppDataSource.destroy();
