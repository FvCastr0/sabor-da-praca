import { PrismaService } from "@/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";

@Injectable()
export class DayService {
  constructor(private prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async createDay() {
    try {
      const dayData = await this.prisma.day.findFirst({
        where: {
          date: new Date().getDate()
        }
      });

      const month = await this.prisma.month.findFirst({
        where: {
          month: new Date().getMonth() + 1
        },
        select: { id: true }
      });

      if (month !== null) {
        if (dayData === null) {
          await this.prisma.day.create({
            data: {
              month: { connect: { id: month.id } },
              date: new Date().getDate()
            }
          });
        }
      }
    } catch (e) {
      return e;
    }
  }
}
