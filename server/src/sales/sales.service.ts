import { PrismaService } from "@/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { CreateSaleDto } from "./dto/CreateSaleDto";

@Injectable()
export class SalesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateSaleDto) {
    try {
      const month = await this.prisma.month.findFirst({
        where: {
          month: new Date().getMonth() + 1
        },
        select: {
          id: true
        }
      });

      await this.prisma.sale.create({
        data: {
          value: dto.value,
          date: new Date(),
          month: { connect: { id: month?.id } }
        }
      });
    } catch (e) {
      return e;
    }
  }
}
