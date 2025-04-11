import { PrismaService } from "@/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { randomUUID } from "node:crypto";
import { CreateSaleDto } from "./dto/CreateSaleDto";

@Injectable()
export class SalesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateSaleDto) {
    try {
      const today = new Date();
      const currentDay = today.getDate();
      const currentMonth = today.getMonth() + 1;
      const currentYear = today.getFullYear();

      await this.prisma.sale.create({
        data: {
          value: dto.value,
          date: dto.date,
          salesDate: {
            connectOrCreate: {
              where: {
                day_month_year: {
                  day: currentDay,
                  month: currentMonth,
                  year: currentYear
                }
              },
              create: {
                id: randomUUID(),
                day: currentDay,
                month: currentMonth,
                year: currentYear
              }
            }
          }
        }
      });
    } catch (e) {
      console.log(e);
      return e;
    }
  }
}
