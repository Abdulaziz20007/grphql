import { InputType, Int, Field, ID } from "@nestjs/graphql";

@InputType()
export class CreateOrderInput {
  @Field()
  quantity: number;

  @Field()
  price: number;


}
