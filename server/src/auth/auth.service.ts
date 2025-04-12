import {
  Injectable,
  NotFoundException,
  UnauthorizedException
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { ResponseData } from "../interfaces/ResponseData";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async signIn(name: string, password: string): Promise<ResponseData> {
    const user = await this.userService.findUser(name);

    if (user === null) throw new NotFoundException("Usuário não existe.");

    if (!name || !password)
      throw new UnauthorizedException("Usuário ou senha inválidos");

    const passwordIsMatch = await bcrypt.compare(password, user?.password);
    const payload = { sub: user.id, name: user.name };

    if (!passwordIsMatch) throw new NotFoundException("Senha incorreta.");

    return {
      message: "Usuário logado com sucesso.",
      status: 200,
      data: { token: await this.jwtService.signAsync(payload) }
    };
  }
}
