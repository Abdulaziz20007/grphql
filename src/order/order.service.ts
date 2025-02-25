import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateOrderInput } from "./dto/create-order.input";
import { UpdateOrderInput } from "./dto/update-order.input";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "./entities/order.entity";
import { Code, Repository } from "typeorm";
import { Customer } from "../customer/entities/customer.entity";
import { GraphQLError } from "graphql";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private readonly orderRepo: Repository<Order>
  ) {}
  async create(createOrderInput: CreateOrderInput, customer: Customer) {
    const newOrder = this.orderRepo.create({ ...createOrderInput, customer });
    console.log(newOrder);
    return this.orderRepo.save(newOrder);
  }

  findAll() {
    return this.orderRepo.find({ relations: ["customer"] });
  }

  findOne(id: number) {
    return this.orderRepo.findOne({ where: { id }, relations: ["customer"] });
  }

  update(id: number, updateOrderInput: UpdateOrderInput) {
    return `This action updates a #${id} order`;
  }

  async remove(id: number) {
    const order = await this.orderRepo.findOne({ where: { id } });
    console.log(order);
    if (!order) {
      throw new GraphQLError(`Order with ID ${id} not found`, {
        extensions: { code: "ORDER_NOT_FOUND", status: 404 },
      });
    }
    await this.orderRepo.delete(order);
    return id;
  }
}
