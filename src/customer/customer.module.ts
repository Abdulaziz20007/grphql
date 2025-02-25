import { Module } from "@nestjs/common";
import { CustomerService } from "./customer.service";
import { CustomerResolver } from "./customer.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Customer } from "./entities/customer.entity";
import { Order } from "../order/entities/order.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Customer, Order])],
  providers: [CustomerResolver, CustomerService],
  exports:[CustomerService]
})
export class CustomerModule {}
