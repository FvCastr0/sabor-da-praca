import { IsEmpty, IsString } from "class-validator";
import { ValidationUserMessages } from "../../data/validation-messages";

export class SignInUserDto {
  @IsString({ message: ValidationUserMessages.IS_STRING })
  @IsEmpty()
  name: string;

  @IsString({ message: ValidationUserMessages.IS_STRING })
  @IsEmpty()
  password: string;
}
