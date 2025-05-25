import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Patch,
  Post,
  Query,
  UseGuards,
  ValidationPipe
} from "@nestjs/common";

import { AuthGuard } from "../auth/auth.guard";
import { CreateSaleDto } from "./dto/CreateSaleDto";
import { GetSalesDataDto } from "./dto/GetSalesDataDto";
import { GetSalesMonthDataDto } from "./dto/GetSalesMonthDataDto";
import { getSalesBetweenDatesDto } from "./dto/getSalesWeek";
import { UpdateSaleValueDto } from "./dto/UpdateSaleValue";
import { SalesService } from "./sales.service";

@Controller("sale")
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @UseGuards(AuthGuard)
  @Get("data")
  async getSales(@Query() date: GetSalesDataDto) {
    const salesData = await this.salesService.getSalesData(date);

    if (salesData.status !== 200)
      throw new NotFoundException(salesData.message);
    return {
      message: "Informações carregadas",
      data: salesData.data
    };
  }

  @Get("data/betweenDates")
  async getSalesBetweenDates(
    @Query(ValidationPipe) date: getSalesBetweenDatesDto
  ) {
    const salesData = await this.salesService.getSalesBetweenDates(date);

    if (salesData.status !== 200)
      throw new NotFoundException(salesData.message);

    return {
      message: "Informações carregadas",
      data: salesData.data
    };
  }
  @UseGuards(AuthGuard)
  @Get("dataMonth")
  async GetSalesMonthData(@Query() { year, month }: GetSalesMonthDataDto) {
    const salesData = await this.salesService.getSalesMonthData({
      year,
      month
    });

    if (salesData.status !== 200)
      throw new NotFoundException(salesData.message);
    return {
      message: "Informações carregadas",
      data: salesData.data
    };
  }

  @UseGuards(AuthGuard)
  @Patch("/update")
  update(@Body() dto: UpdateSaleValueDto) {
    return this.salesService.updateSalesValue(dto);
  }

  @Post("/newSale")
  create(@Body() dto: CreateSaleDto) {
    return this.salesService.create(dto);
  }
}
