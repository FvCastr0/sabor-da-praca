import { Injectable } from "@nestjs/common";
import { randomUUID } from "node:crypto";
import { ResponseData } from "../interfaces/ResponseData";
import { PrismaService } from "../prisma/prisma.service";
import { getAverageTicket } from "../utils/getAvarageTicket";
import { getPeakHour } from "../utils/getPeakHours";
import { getTotalSalesValue } from "../utils/getTotalValueSales";
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

    const morningSales = () => {
      const morning: { date: Date; value: number }[] = [];
      sales.sales.map(sale => {
        if (sale.date.getHours() < 13) {
          morning.push(sale);
        }
      });
      return morning;
    };

    const afternoonSales = () => {
      const afternoonSales: { date: Date; value: number }[] = [];
      sales.sales.map(sale => {
        if (sale.date.getHours() >= 13) {
          afternoonSales.push(sale);
        }
      });
      return afternoonSales;
    };

    return {
      message: "Vendas carregadas com sucesso",
      status: 200,
      data: {
        general: {
          sales,
          salesQuantity: sales.sales.length,
          totalValue: Number(getTotalSalesValue(sales.sales).toFixed(2)),
          mediumTicket: getAverageTicket(sales.sales),
          peekHour: getPeakHour(sales.sales)
        },
        morningSales: {
          salesQuantity: morningSales().length,
          totalValue: Number(getTotalSalesValue(morningSales()).toFixed(2)),
          mediumTicket: getAverageTicket(morningSales()),
          peekHour: getPeakHour(morningSales())
        },
        afternoonSales: {
          salesQuantity: afternoonSales().length,
          totalValue: Number(getTotalSalesValue(afternoonSales()).toFixed(2)),
          mediumTicket: getAverageTicket(afternoonSales()),
          peekHour: getPeakHour(afternoonSales())
        }
      }
    };
  }

  async create(dto: CreateSaleDto) {
    try {
      const today = new Date();
      const currentDay = today.getDate();
      const currentMonth = today.getMonth() + 1;
      const currentYear = today.getFullYear();

      const isoDate = new Date(dto.date).toISOString();

      await this.prisma.sale.create({
        data: {
          value: dto.value,
          date: isoDate,
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
