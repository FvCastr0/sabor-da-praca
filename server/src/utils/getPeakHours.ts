export function getPeakHour(sales: { date: Date }[]): number {
  if (!sales || sales.length === 0) {
    console.log("Nenhuma venda encontrada.");
    return 0;
  }

  const count: Record<number, number> = {};
  let mostFrequentHour = 0;
  let highestCount = 0;

  sales.forEach(sale => {
    const hour = sale.date.getHours();
    count[hour] = (count[hour] || 0) + 1;

    if (count[hour] > highestCount) {
      highestCount = count[hour];
      mostFrequentHour = hour;
    }
  });

  return mostFrequentHour;
}
