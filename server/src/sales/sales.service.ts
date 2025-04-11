import { Injectable } from "@nestjs/common";
import { randomUUID } from "node:crypto";
import { ResponseData } from "../interfaces/ResponseData";
import { PrismaService } from "../prisma/prisma.service";
import { CreateSaleDto } from "./dto/CreateSaleDto";
import { GetSalesDataDto } from "./dto/GetSalesDataDto";

@Injectable()
export class SalesService {
  constructor(private prisma: PrismaService) {}

  async getSalesData(dto: GetSalesDataDto): Promise<ResponseData> {
    const sales = await this.prisma.salesDate.findUnique({
      where: {
        day_month_year: {
          day: Number(dto.day),
          month: Number(dto.month),
          year: Number(dto.year)
        }
      },
      select: {
        sales: {
          select: {
            value: true,
            date: true
          }
        }
      }
    });

    if (sales === null) return { message: "Data não encontrada.", status: 404 };

    const totalSalesValue = () => {
      let totalValue = 0;
      sales?.sales.map(sale => {
        totalValue += sale.value;
      });
      return totalValue;
    };

    const mediumTicket = Number(
      (totalSalesValue() / sales.sales.length).toFixed(2)
    );

    function calculatePeakHour() {
      const arrHours = [] as number[];
      const count = {};
      let frequentlyNumber = 0;
      let highestCount = 0;

      sales?.sales.map(sale => {
        arrHours.push(sale.date.getHours());
      });

      for (const hour of arrHours) {
        if (count[hour]) {
          count[hour]++;
        } else {
          count[hour] = 1;
        }

        if (count[hour] > highestCount) {
          highestCount = count[hour];
          frequentlyNumber = hour;
        }
      }

      return frequentlyNumber;
    }

    return {
      message: "Vendas carregadas com sucesso",
      status: 200,
      data: {
        sales,
        salesQuantity: sales.sales.length,
        totalValue: Number(totalSalesValue().toFixed(2)),
        mediumTicket,
        peekHour: calculatePeakHour()
      }
    };
  }

  async create(dto: CreateSaleDto) {
    try {
      const today = new Date();
      const currentDay = today.getDate();
      const currentMonth = today.getMonth() + 1;
      const currentYear = today.getFullYear();

      console.log(dto);

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
