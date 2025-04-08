import {
  ValidationMonthMessages,
  ValidationYearMessages
} from "@/data/validation-messages";
import { Type } from "class-transformer";
import { IsInt, IsNumber, Max, Min } from "class-validator";

export class GetDayOfMonthDto {
  @Type(() => Number)
  @IsNumber({}, { message: ValidationMonthMessages.IS_NUMBER })
  @IsInt({ message: ValidationMonthMessages.IS_INT })
  @Min(1, { message: ValidationMonthMessages.MONTH_MIN })
  @Max(12, { message: ValidationMonthMessages.MONTH_MAX })
  month: number;

  @Type(() => Number)
  @IsNumber({}, { message: ValidationYearMessages.IS_NUMBER })
  @Min(2000, { message: ValidationYearMessages.YEAR_MIN })
  @Max(9999, { message: ValidationYearMessages.YEAR_MAX })
  @IsInt({ message: ValidationYearMessages.IS_INT })
  year: number;
}
