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

      await this.prisma.sale.create({
        data: {
          value: dto.value,
          date: dto.date,
          day: { connect: { id: dayId?.id } }
        }
      });
    } catch (e) {
      return e;
    }
  }
}
