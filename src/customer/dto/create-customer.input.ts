import { InputType, Int, Field } from "@nestjs/graphql";
import { IsString, MinLength, MaxLength, IsEmail, Matches } from "class-validator";

@InputType()
export class CreateCustomerInput {
  @Field()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  @Matches(/^\+?[1-9]\d{1,14}$/)
  phone_number: string;
}
