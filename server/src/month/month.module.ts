import { PrismaService } from "@/prisma/prisma.service";
import { Module } from "@nestjs/common";
import { MonthController } from "./month.controller";
import { MonthService } from "./month.service";

@Module({
  controllers: [MonthController],
  providers: [MonthService, PrismaService]
})
export class MonthModule {}
