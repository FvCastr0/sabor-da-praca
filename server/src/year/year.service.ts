import { PrismaService } from "@/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { GetMonthsOfYearDto } from "./dto/getMonthsOfYearDto";

@Injectable()
export class YearService {
  constructor(private prisma: PrismaService) {}
  @Cron(CronExpression.EVERY_YEAR)
  async verifyIfYearExistOrCreate() {
    try {
      const yearData = await this.prisma.year.findFirst({
        where: {
          year: new Date().getFullYear()
        }
      });
      if (yearData === null) {
        await this.prisma.year.create({
          data: {
            year: new Date().getFullYear()
          }
        });
      }
    } catch (e) {
      return e;
    }
  }

  async getMonthsOfYear(dto: GetMonthsOfYearDto) {
    try {
      const months = await this.prisma.year.findFirst({
        where: {
          year: dto.year
        },
        select: {
          months: true
        }
      });

      return months;
    } catch (e) {
      return e;
    }
  }
}
