import {
  Injectable,
  InternalServerErrorException,
  OnModuleDestroy
} from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { randomUUID } from "node:crypto";
import { ResponseData } from "../interfaces/ResponseData";
import { PrismaService } from "../prisma/prisma.service";
import { getAverageTicket } from "../utils/getAvarageTicket";
import { getPeakHour } from "../utils/getPeakHours";
import { getTotalSalesValue } from "../utils/getTotalValueSales";
import { CreateSaleDto } from "./dto/CreateSaleDto";
import { GetSalesDataDto } from "./dto/GetSalesDataDto";

@Injectable()
export class SalesService implements OnModuleDestroy {
  private salesBuffer: CreateSaleDto[] = [];
  private readonly batchSize = 50;
  private processingBatch = false;

  constructor(private prisma: PrismaService) {}

  async onModuleDestroy() {
    await this.processSalesBatch();
  }

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
      sales.sales.forEach(sale => {
        if (sale.date.getHours() < 13) {
          morning.push(sale);
        }
      });
      return morning;
    };

    const afternoonSales = () => {
      const afternoonSales: { date: Date; value: number }[] = [];
      sales.sales.forEach(sale => {
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
    this.salesBuffer.push(dto);
    if (this.salesBuffer.length >= this.batchSize && !this.processingBatch) {
      await this.processSalesBatch();
    }
  }

  private async processSalesBatch() {
    if (this.salesBuffer.length === 0 || this.processingBatch) {
      return;
    }

    this.processingBatch = true;
    const batchToProcess = [...this.salesBuffer];
    this.salesBuffer = [];

    try {
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

      const salesDataToCreate = batchToProcess.map(dto => ({
        value: dto.value,
        date: new Date(dto.date).toISOString(),
        salesDateId: salesDateRecord.id
      }));

      await this.prisma.sale.createMany({
        data: salesDataToCreate
      });
    } catch (e) {
      throw new InternalServerErrorException("Error processing sales batch", e);
    } finally {
      this.processingBatch = false;
      if (this.salesBuffer.length >= this.batchSize) {
        await this.processSalesBatch();
      }
    }
  }

  @Cron(CronExpression.EVERY_4_HOURS)
  private async pushSalesEverySixHours() {
    if (this.salesBuffer.length > 0) await this.processSalesBatch();
  }
}
