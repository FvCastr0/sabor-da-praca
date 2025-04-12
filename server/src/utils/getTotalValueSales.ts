export function getTotalSalesValue(sales: { value: number }[]): number {
  return sales.reduce((acc, sale) => acc + sale.value, 0);
}
