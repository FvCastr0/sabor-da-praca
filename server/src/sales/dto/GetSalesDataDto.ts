import { Transform } from "class-transformer";
import { IsInt, Max, Min } from "class-validator";
import { ValidationDateMessages } from "../../data/validation-messages";

export class GetSalesDataDto {
  @Transform(({ value }) => parseInt(value))
  @IsInt({ message: ValidationDateMessages.IS_INT })
  @Min(1, { message: ValidationDateMessages.DAY_MIN })
  @Max(31, { message: ValidationDateMessages.DAY_MAX })
  day: number;

  @Transform(({ value }) => parseInt(value))
  @IsInt({ message: ValidationDateMessages.IS_INT })
  @Min(1, { message: ValidationDateMessages.MONTH_MIN })
  @Max(12, { message: ValidationDateMessages.MONTH_MAX })
  month: number;

  @Transform(({ value }) => parseInt(value))
  @IsInt({ message: ValidationDateMessages.IS_INT })
  @Min(2000, { message: ValidationDateMessages.YEAR_MIN })
  @Max(3000, { message: ValidationDateMessages.YEAR_MAX })
  year: number;
}
