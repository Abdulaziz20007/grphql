import { InputType, Field, Int, PartialType } from "@nestjs/graphql";

@InputType()
export class UpdateCustomerInput {
  @Field()
  email?: string;

  @Field()
  name?: string;

  @Field()
  phone_number?: string;
}
