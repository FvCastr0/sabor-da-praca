import {
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Query
} from "@nestjs/common";
import { GetDayOfMonthDto } from "./dto/GetDayOfMonthDto";
import { MonthService } from "./month.service";

@Controller("month")
export class MonthController {
  constructor(private readonly monthService: MonthService) {}

  @Get("days")
  @HttpCode(200)
  async GetSales(@Query() dto: GetDayOfMonthDto) {
    const days = await this.monthService.getDayOfMonth(dto);

    if (!days) {
      throw new NotFoundException("Essa data não foi encontrada.");
    } else {
      return {
        message: "Dias carregados com sucesso",
        data: days.data
      };
    }
  }
}
