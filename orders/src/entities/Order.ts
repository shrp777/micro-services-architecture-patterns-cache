import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import type { OrderItem } from "./OrderItem";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "shipped"
  | "delivered"
  | "cancelled";

@Entity()
export class Order {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", default: "pending" })
  status!: OrderStatus;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  total!: number;

  @OneToMany("OrderItem", (item: OrderItem) => item.order, {
    cascade: true,
    eager: true
  })
  items!: OrderItem[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
