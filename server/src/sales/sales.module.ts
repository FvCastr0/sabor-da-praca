import { PrismaService } from "@/prisma/prisma.service";
import { Module } from "@nestjs/common";
import { SalesController } from "./sales.controller";
import { SalesService } from "./sales.service";

@Module({
  controllers: [SalesController],
  providers: [SalesService, PrismaService]
})
export class SalesModule {}
