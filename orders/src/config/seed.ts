import { AppDataSource } from "@config/data-source";
import { Order } from "@entities/Order";
import { OrderItem } from "@entities/OrderItem";

await AppDataSource.initialize();

const orderRepo = AppDataSource.getRepository(Order);
const orderItemRepo = AppDataSource.getRepository(OrderItem);

await orderItemRepo.createQueryBuilder().delete().execute();
await orderRepo.createQueryBuilder().delete().execute();

const orders: Partial<Order>[] = [
  {
    id: Bun.randomUUIDv7(),
    status: "delivered",
    total: 37.97,
    items: [
      orderItemRepo.create({
        productId: "a1b2c3d4-0001-4000-8000-000000000001",
        quantity: 1,
        price: 12.99
      }),
      orderItemRepo.create({
        productId: "a1b2c3d4-0001-4000-8000-000000000002",
        quantity: 1,
        price: 9.99
      }),
      orderItemRepo.create({
        productId: "a1b2c3d4-0001-4000-8000-000000000008",
        quantity: 1,
        price: 9.99
      })
    ]
  },
  {
    id: Bun.randomUUIDv7(),
    status: "confirmed",
    total: 41.97,
    items: [
      orderItemRepo.create({
        productId: "a1b2c3d4-0001-4000-8000-000000000003",
        quantity: 1,
        price: 14.99
      }),
      orderItemRepo.create({
        productId: "a1b2c3d4-0001-4000-8000-000000000007",
        quantity: 1,
        price: 13.99
      }),
      orderItemRepo.create({
        productId: "a1b2c3d4-0001-4000-8000-000000000006",
        quantity: 1,
        price: 12.99
      })
    ]
  },
  {
    id: Bun.randomUUIDv7(),
    status: "pending",
    total: 23.98,
    items: [
      orderItemRepo.create({
        productId: "a1b2c3d4-0001-4000-8000-000000000004",
        quantity: 1,
        price: 11.99
      }),
      orderItemRepo.create({
        productId: "a1b2c3d4-0001-4000-8000-000000000005",
        quantity: 1,
        price: 11.99
      })
    ]
  }
];

await orderRepo.save(orders);

console.log("Orders seeded successfully");

await AppDataSource.destroy();
