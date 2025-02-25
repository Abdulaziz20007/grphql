import { ObjectType, Field, Int, ID } from "@nestjs/graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "../../order/entities/order.entity";

@ObjectType()
@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Field({ description: "Customer name " })
  @Column()
  name: string;

  @Field({ description: "Customer email " })
  @Column()
  email: string;

  @Field({ description: "Customer phone number " })
  @Column()
  phone_number: string;

  @OneToMany(() => Order, (order) => order.customer)
  @Field(() => [Order])
  orders: Order[];
}
