import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MonthModule } from "./month/month.module";
import { PrismaService } from "./prisma/prisma.service";
import { SalesModule } from "./sales/sales.module";
import { YearModule } from "./year/year.module";

@Module({
  imports: [ScheduleModule.forRoot(), SalesModule, YearModule, MonthModule],
  controllers: [AppController],
  providers: [AppService, PrismaService]
})
export class AppModule {}
