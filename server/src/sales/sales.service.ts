import { PrismaService } from "@/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { CreateSaleDto } from "./dto/CreateSaleDto";

@Injectable()
export class SalesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateSaleDto) {
    try {
      const dayId = await this.prisma.day.findFirst({
        where: {
          date: new Date().getDate()
        },
        select: {
          id: true
        }
      });

      const month = await this.prisma.month.findFirst({
        where: {
          month: new Date().getMonth() + 1
        },
        select: { id: true }
      });

      await this.prisma.sale.create({
        data: {
          value: dto.value,
          date: dto.date,
          day: {
            connectOrCreate: {
              where: { id: dayId?.id },
              create: {
                month: { connect: { id: month?.id } },
                date: new Date().getDate()
              }
            }
          }
        }
      });
    } catch (e) {
      return e;
    }
  }
}
