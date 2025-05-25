import { Type } from "class-transformer";
import { IsInt, Max, Min } from "class-validator";

export class getSalesBetweenDatesDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(31)
  startDay: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(12)
  startMonth: number;

  @Type(() => Number)
  @IsInt()
  startYear: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(31)
  endDay: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(12)
  endMonth: number;

  @Type(() => Number)
  @IsInt()
  endYear: number;
}
