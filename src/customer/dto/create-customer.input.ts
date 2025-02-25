import { InputType, Int, Field } from "@nestjs/graphql";

@InputType()
export class CreateCustomerInput {
  @Field()
  name: string;
  @Field()
  email: string;
  @Field()
  phone_number: string;
}
