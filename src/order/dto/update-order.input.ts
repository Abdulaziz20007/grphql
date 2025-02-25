import { CreateOrderInput } from "./create-order.input";
import { InputType, Field, Int, PartialType, ID } from "@nestjs/graphql";

@InputType()
export class UpdateOrderInput {
  @Field()
  quantity?: number;

  @Field()
  price?: number;
}
