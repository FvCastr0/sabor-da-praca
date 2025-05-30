import { Transform } from "class-transformer";
import { IsDate, IsNumber } from "class-validator";
import { ValidationSaleMessages } from "../../data/validation-messages";

export class CreateSaleDto {
  @IsNumber({}, { message: ValidationSaleMessages.IS_NUMBER })
  value: number;
  @IsDate({ message: ValidationSaleMessages.IS_DATE })
  @Transform(({ value }) => new Date(value))
  date: Date;
}
