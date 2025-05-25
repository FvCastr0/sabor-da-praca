"use client";

import { CardSales } from "@/components/ui/CardSales";
import { Sales } from "@/components/ui/Sales";
import { poppins, raleway } from "@/components/ui/theme";
import { getMonthSales } from "@/lib/getMonthSales";
import { useState } from "react";
import { toast } from "react-toastify";

export default function MonthSalesClient() {
  const [monthSales, setMonthSales] = useState({
    data: {
      salesQuantity: 0,
      mediumTicket: 0,
      totalValue: 0
    }
  });

  async function handleDateChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedDate = event.target.value;
    const selectedMonth = parseInt(selectedDate.split("-")[1]);
    const selectedYear = parseInt(selectedDate.split("-")[0]);

    if (selectedMonth !== undefined && selectedYear !== undefined) {
      const response = await getMonthSales(
        selectedMonth as number,
        selectedYear as number
      );
      const salesData = response.data;

      if (!response.ok) {
        toast.error("Erro ao buscar vendas");
      } else {
        toast.success("Vendas carregadas com sucesso");
      }

      if (salesData) {
        setMonthSales({
          data: {
            salesQuantity: salesData.salesQuantity,
            mediumTicket: salesData.mediumTicket,
            totalValue: salesData.totalValue
          }
        });
      } else {
        toast.error("Dados de vendas não encontrados");
      }
    } else {
      toast.error("Selecione um mês e ano válidos");
    }
  }

  return (
    <Sales>
      <section>
        <CardSales className={raleway.className} type="month">
          <div className="card-header">
            <h2>Vendas do mês</h2>
            <input
              type="month"
              className={poppins.className}
              placeholder="mm/aaaa"
              onChange={handleDateChange}
            />
          </div>

          <p>
            Vendas: R${" "}
            <span className={poppins.className}>
              {monthSales.data.salesQuantity.toFixed(2).replace(".", ",")}
            </span>
          </p>
          <p>
            Ticket médio: R${" "}
            <span className={poppins.className}>
              {monthSales.data.mediumTicket.toFixed(2).replace(".", ",")}
            </span>
          </p>
          <p>
            Total:{" "}
            <span className={poppins.className}>
              {monthSales.data.totalValue}
            </span>
          </p>
        </CardSales>
      </section>
    </Sales>
  );
}
