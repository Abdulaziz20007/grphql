import { ObjectType, Field, Int, ID } from "@nestjs/graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Customer } from "../../customer/entities/customer.entity";

@ObjectType()
@Entity()
export class Order {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  quantity: number;

  @Field()
  @Column()
  price: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Customer, (customer) => customer.orders, {
    onDelete: "SET NULL",
  })
  @Field(() => Customer, { nullable: true })
  customer?: Customer;
}
