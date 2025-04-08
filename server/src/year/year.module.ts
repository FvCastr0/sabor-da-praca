import { PrismaService } from "@/prisma/prisma.service";
import { Module } from "@nestjs/common";
import { YearController } from "./year.controller";
import { YearService } from "./year.service";

@Module({
  controllers: [YearController],
  providers: [YearService, PrismaService],
  imports: []
})
export class YearModule {}
