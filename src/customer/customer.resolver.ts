import { Resolver, Query, Mutation, Args, Int, ID } from "@nestjs/graphql";
import { CustomerService } from "./customer.service";
import { Customer } from "./entities/customer.entity";
import { CreateCustomerInput } from "./dto/create-customer.input";
import { UpdateCustomerInput } from "./dto/update-customer.input";

@Resolver(() => Customer)
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) {}

  @Mutation(() => Customer)
  createCustomer(
    @Args("createCustomerInput") createCustomerInput: CreateCustomerInput
  ) {
    return this.customerService.create(createCustomerInput);
  }

  @Query(() => [Customer], { name: "customeAll" })
  findAll() {
    return this.customerService.findAll();
  }

  @Query(() => Customer, { name: "customer" })
  findOneCustomer(@Args("id", { type: () => ID }) id: number) {
    return this.customerService.findOne(id);
  }

  @Mutation(() => Customer)
  updateCustomer(
    @Args("id", { type: () => ID }) id: number,
    @Args("updateCustomerInput") updateCustomerInput: UpdateCustomerInput
  ) {
    return this.customerService.update(id, updateCustomerInput);
  }

  @Mutation(() => Customer)
  removeCustomer(@Args("id", { type: () => ID }) id: number) {
    return this.customerService.remove(id);
  }
}
