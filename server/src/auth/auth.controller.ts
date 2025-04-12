import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards
} from "@nestjs/common";
import { createUserDto } from "../user/dto/createUserDto";
import { UserService } from "../user/user.service";
import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";
import { SignInUserDto } from "./dto/SignInUserDto";

@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post("login")
  signIn(@Body() signInDto: SignInUserDto) {
    return this.authService.signIn(signInDto.name, signInDto.password);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post("create")
  @UseGuards(AuthGuard)
  userCreateArgs(@Body() user: createUserDto) {
    return this.userService.createUser(user);
  }

  @UseGuards(AuthGuard)
  @Get("profile")
  getProfile(@Request() req) {
    return req.user;
  }
}
