import {
  Injectable,
  NotFoundException,
  UnauthorizedException
} from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { randomUUID } from "crypto";
import { ResponseData } from "../interfaces/ResponseData";
import { PrismaService } from "../prisma/prisma.service";
import { createUserDto } from "./dto/createUserDto";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findUser(name: string) {
    if (name === undefined)
      throw new UnauthorizedException("O campo nome não pode estar vazio.");

    const user = await this.prisma.user.findUnique({
      where: { name },
      select: {
        name: true,
        password: true,
        id: true
      }
    });

    if (user === null) throw new NotFoundException("Usuário não encontrado.");

    return user;
  }

  async createUser(dto: createUserDto): Promise<ResponseData> {
    if (dto.password === undefined || dto.name === undefined)
      throw new NotFoundException("Campos inválidos.");

    const user = await this.prisma.user.findUnique({
      where: { name: dto.name }
    });

    if (user !== null)
      throw new UnauthorizedException("Esse usuário já existe.");

    const hashedPassword = await bcrypt.hash(dto.password, 12);

    await this.prisma.user.create({
      data: {
        name: dto.name,
        password: hashedPassword,
        isAdmin: dto.isAdmin,
        id: randomUUID()
      }
    });

    return {
      message: "Usuário criado com sucesso!",
      status: 200
    };
  }
}
