import { ValidationSaleMessages } from "@/data/validation-messages";
import { IsNumber } from "class-validator";

export class CreateSaleDto {
  @IsNumber({}, { message: ValidationSaleMessages.IS_NUMBER })
  value: number;
}
