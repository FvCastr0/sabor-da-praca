import {
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Query
} from "@nestjs/common";
import { GetSalesOfMonthDto } from "./dto/GetSalesOfMonthDto";
import { MonthService } from "./month.service";

@Controller("month")
export class MonthController {
  constructor(private readonly monthService: MonthService) {}

  @Get("sales")
  @HttpCode(200)
  async GetSales(@Query() dto: GetSalesOfMonthDto) {
    const sales = await this.monthService.getSalesOfMonth(dto);

    if (!sales) {
      throw new NotFoundException("Essa data não foi encontrada.");
    } else {
      return {
        message: "Vendas carregadas com sucesso",
        data: sales.data
      };
    }
  }
}
