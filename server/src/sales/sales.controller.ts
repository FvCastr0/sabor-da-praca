import { Body, Controller, Post } from "@nestjs/common";

import { CreateSaleDto } from "./dto/CreateSaleDto";
import { SalesService } from "./sales.service";

@Controller("sale")
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post("/newSale")
  create(@Body() dto: CreateSaleDto) {
    return this.salesService.create(dto);
  }
}
