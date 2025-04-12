import { IsBoolean, IsString, MinLength } from "class-validator";
import { ValidationUserMessages } from "../../data/validation-messages";

export class createUserDto {
  @IsString({ message: ValidationUserMessages.IS_STRING })
  @MinLength(3, { message: ValidationUserMessages.MIN_LENGTH_NAME })
  name: string;

  @IsString({ message: ValidationUserMessages.IS_STRING })
  @MinLength(4, { message: ValidationUserMessages.MIN_LENGTH_PASSWORD })
  password: string;

  @IsBoolean()
  isAdmin: boolean;
}
