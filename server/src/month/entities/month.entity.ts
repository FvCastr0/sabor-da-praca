import { Sale } from "@/sales/entities/sale.entity";

export class Month {
  id: number;
  month: number;
  sales: Sale[];
}
