import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

@Entity()
export class Stock {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  productId!: string;

  @Column({ type: "int", default: 0 })
  quantity!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
