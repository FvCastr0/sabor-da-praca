import { Transform } from "class-transformer";
import { IsEmpty, IsNumber } from "class-validator";

export class UpdateSaleValueDto {
  @IsEmpty({ message: "O id não pode ser vazio." })
  id: string;

  @Transform(({ value }) => parseInt(value))
  @IsEmpty({ message: "O valor não pode ser vazio." })
  @IsNumber({}, { message: "O valor deve ser um número." })
  value: number;
}
