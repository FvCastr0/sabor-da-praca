import { Module } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { UserService } from "./user.service";

@Module({
  providers: [UserService, PrismaService],
  controllers: []
})
export class UserModule {}
