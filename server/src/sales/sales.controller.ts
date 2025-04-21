import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Patch,
  Post,
  Query
} from "@nestjs/common";

import { CreateSaleDto } from "./dto/CreateSaleDto";
import { GetSalesDataDto } from "./dto/GetSalesDataDto";
import { UpdateSaleValueDto } from "./dto/UpdateSaleValue";
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

  @Patch("/update")
  update(@Body() dto: UpdateSaleValueDto) {
    return this.salesService.updateSalesValue(dto);
  }

  @Post("/newSale")
  create(@Body() dto: CreateSaleDto) {
    return this.salesService.create(dto);
  }
}
