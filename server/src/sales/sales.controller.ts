import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Query
} from "@nestjs/common";

import { CreateSaleDto } from "./dto/CreateSaleDto";
import { GetSalesDataDto } from "./dto/GetSalesDataDto";
import { SalesService } from "./sales.service";

@Controller("sale")
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

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

  @Post("/newSale")
  create(@Body() dto: CreateSaleDto) {
    return this.salesService.create(dto);
  }
}
