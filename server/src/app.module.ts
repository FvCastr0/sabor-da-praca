import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { PrismaService } from "./prisma/prisma.service";
import { SalesModule } from "./sales/sales.module";

@Module({
  imports: [ScheduleModule.forRoot(), SalesModule],
  controllers: [],
  providers: [PrismaService]
})
export class AppModule {}
