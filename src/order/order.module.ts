import { Module } from "@nestjs/common";
import { OrderService } from "./order.service";
import { OrderResolver } from "./order.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "./entities/order.entity";
import { Customer } from "../customer/entities/customer.entity";
import { CustomerResolver } from "../customer/customer.resolver";
import { CustomerModule } from "../customer/customer.module";

@Module({
  imports: [TypeOrmModule.forFeature([Order, Customer]) ,CustomerModule],
  providers: [OrderResolver, OrderService,CustomerResolver],
})
export class OrderModule {}
