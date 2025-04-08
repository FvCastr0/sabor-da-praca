import {
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Query
} from "@nestjs/common";
import { GetMonthsOfYearDto } from "./dto/getMonthsOfYearDto";
import { YearService } from "./year.service";

@Controller("year")
export class YearController {
  constructor(private readonly yearService: YearService) {}

  @Get("months")
  @HttpCode(200)
  async GetMonths(@Query() dto: GetMonthsOfYearDto) {
    const year = await this.yearService.getMonthsOfYear(dto);
    if (!year) {
      throw new NotFoundException("O ano não foi encontrado.");
    }

    return {
      message: "Meses carregados com sucesso.",
      data: year
    };
  }
}
