import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import type { Order } from "./Order";

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  productId!: string;

  @Column()
  quantity!: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price!: number;

  @ManyToOne("Order", (order: Order) => order.items)
  order!: Order;
}
