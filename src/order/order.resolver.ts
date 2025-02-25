import { Resolver, Query, Mutation, Args, Int, ID } from "@nestjs/graphql";
import { OrderService } from "./order.service";
import { Order } from "./entities/order.entity";
import { CreateOrderInput } from "./dto/create-order.input";
import { UpdateOrderInput } from "./dto/update-order.input";
import { Customer } from "../customer/entities/customer.entity";
import { CustomerResolver } from "../customer/customer.resolver";

@Resolver(() => Order)
export class OrderResolver {
  constructor(
    private readonly orderService: OrderService,
    private readonly customerResolver: CustomerResolver
  ) {}

  @Mutation(() => Order)
  async createOrder(
    @Args("createOrderInput") createOrderInput: CreateOrderInput,
    @Args("id", { type: () => ID }) id: number
  ) {
    const customer = await this.customerResolver.findOneCustomer(id);
    return this.orderService.create(createOrderInput, customer);
  }

  @Query(() => [Order], { name: "orderAll" })
  findAll() {
    return this.orderService.findAll();
  }

  @Query(() => Order, { name: "order" })
  findOne(@Args("id", { type: () => ID }) id: number) {
    return this.orderService.findOne(id);
  }

  @Mutation(() => Order)
  updateOrder(
    @Args("updateOrderInput") updateOrderInput: UpdateOrderInput,
    @Args("id", { type: () => ID }) id: number
  ) {
    return this.orderService.update(id, updateOrderInput);
  }

  @Mutation(() => Order)
  removeOrder(@Args("id", { type: () => ID }) id: number) {
    return this.orderService.remove(id);
  }
}
