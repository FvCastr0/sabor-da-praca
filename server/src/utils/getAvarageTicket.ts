import { getTotalSalesValue } from "./getTotalValueSales";

export function getAverageTicket(sales: { value: number }[]): number {
  if (sales.length === 0) return 0;

  const total = getTotalSalesValue(sales);
  return Number((total / sales.length).toFixed(2));
}
