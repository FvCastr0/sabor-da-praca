import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { DayModule } from "./day/day.module";
import { MonthModule } from "./month/month.module";
import { PrismaService } from "./prisma/prisma.service";
import { SalesModule } from "./sales/sales.module";
import { YearModule } from "./year/year.module";

@Module({
  imports: [
    ScheduleModule.forRoot(),
    SalesModule,
    YearModule,
    MonthModule,
    DayModule
  ],
  controllers: [],
  providers: [PrismaService]
})
export class AppModule {}
