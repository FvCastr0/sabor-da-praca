import { PrismaService } from "@/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { GetSalesOfMonthDto } from "./dto/GetSalesOfMonthDto";

@Injectable()
export class MonthService {
  constructor(private prisma: PrismaService) {}
  @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT)
  async verifyIfMonthExistOrCreate() {
    try {
      const monthData = await this.prisma.month.findFirst({
        where: {
          month: new Date().getMonth() + 1
        }
      });

      const year = await this.prisma.year.findUnique({
        where: {
          year: new Date().getFullYear()
        },
        select: { id: true }
      });

      if (year !== null) {
        if (monthData === null) {
          await this.prisma.month.create({
            data: {
              yearId: year.id,
              month: new Date().getMonth() + 1
            }
          });
        }
      }
    } catch (e) {
      return e;
    }
  }

  async getSalesOfMonth(dto: GetSalesOfMonthDto) {
    try {
      const year = await this.prisma.year.findFirst({
        where: {
          year: dto.year
        },
        select: {
          id: true
        }
      });

      const month = await this.prisma.month.findFirst({
        where: {
          month: dto.month
        },
        select: {
          sales: true,
          yearId: true
        }
      });

      if (year?.id !== month?.yearId) {
        return {
          success: false
        };
      } else {
        return {
          success: true,
          data: month?.sales
        };
      }
    } catch (e) {
      return e;
    }
  }
}
