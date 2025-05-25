import { Injectable } from "@nestjs/common";
import { toZonedTime } from "date-fns-tz";
import { randomUUID } from "node:crypto";
import { ResponseData } from "../interfaces/ResponseData";
import { PrismaService } from "../prisma/prisma.service";
import { getAverageTicket } from "../utils/getAvarageTicket";
import { getPeakHour } from "../utils/getPeakHours";
import { getTotalSalesValue } from "../utils/getTotalValueSales";
import { CreateSaleDto } from "./dto/CreateSaleDto";
import { GetSalesDataDto } from "./dto/GetSalesDataDto";
import { GetSalesMonthDataDto } from "./dto/GetSalesMonthDataDto";
import { UpdateSaleValueDto } from "./dto/UpdateSaleValue";

const TIME_ZONE = "America/Sao_Paulo";

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
            date: true,
            id: true
          }
        }
      }
    });

    if (sales === null) return { message: "Data não encontrada.", status: 404 };

    const salesWithSaoPauloTime = sales.sales.map(sale => ({
      ...sale,
      date: toZonedTime(sale.date, TIME_ZONE)
    }));

    const morningSales = () => {
      const morning: { date: Date; value: number }[] = [];
      salesWithSaoPauloTime.forEach(sale => {
        if (sale.date.getHours() < 13) {
          morning.push(sale);
        }
      });
      return morning;
    };

    const afternoonSales = () => {
      const afternoonSales: { date: Date; value: number }[] = [];
      salesWithSaoPauloTime.forEach(sale => {
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
          salesQuantity: salesWithSaoPauloTime.length,
          totalValue: Number(
            getTotalSalesValue(salesWithSaoPauloTime).toFixed(2)
          ),
          mediumTicket: getAverageTicket(salesWithSaoPauloTime),
          peekHour: getPeakHour(salesWithSaoPauloTime)
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

  async getSalesMonthData(dto: GetSalesMonthDataDto): Promise<ResponseData> {
    const sales = await this.prisma.salesDate.findMany({
      where: {
        month: Number(dto.month),
        year: Number(dto.year)
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

    if (sales.length === 0)
      return { message: "Data não encontrada.", status: 404 };

    const salesWithSaoPauloTime = sales.flatMap(sale =>
      sale.sales.map(s => ({
        ...s,
        date: toZonedTime(s.date, TIME_ZONE)
      }))
    );

    let salesMonthValue = 0;
    salesWithSaoPauloTime.forEach(sale => {
      salesMonthValue += sale.value;
    });

    return {
      message: "Vendas carregadas com sucesso",
      status: 200,
      data: {
        salesQuantity: salesWithSaoPauloTime.length,
        totalValue: Number(salesMonthValue.toFixed(2)),
        mediumTicket: getAverageTicket(salesWithSaoPauloTime)
      }
    };
  }

  async updateSalesValue(dto: UpdateSaleValueDto): Promise<ResponseData> {
    const sale = await this.prisma.sale.findUnique({
      where: {
        id: dto.id
      }
    });

    if (!sale) {
      return {
        message: "Venda não encontrada",
        status: 404
      };
    }

    await this.prisma.sale.update({
      where: {
        id: dto.id
      },
      data: {
        value: dto.value
      }
    });

    return {
      message: "Venda atualizada com sucesso",
      status: 200
    };
  }

  async create(dto: CreateSaleDto) {
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();

    const salesDateRecord = await this.prisma.salesDate.upsert({
      where: {
        day_month_year: {
          day: currentDay,
          month: currentMonth,
          year: currentYear
        }
      },
      update: {},
      create: {
        id: randomUUID(),
        day: currentDay,
        month: currentMonth,
        year: currentYear
      }
    });

    await this.prisma.sale.create({
      data: {
        value: dto.value,
        date: new Date(dto.date).toISOString(),
        salesDateId: salesDateRecord.id
      }
    });
  }
}
