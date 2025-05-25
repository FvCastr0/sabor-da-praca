"use client";

import { CardSales } from "@/components/ui/CardSales";
import { Sales } from "@/components/ui/Sales";
import { poppins, raleway } from "@/components/ui/theme";
import { getSalesBetweenDates } from "@/lib/getSalesBetweenDates";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function SalesBetweenDates() {
  const [startDate, setStartDate] = useState<Date>();

  const [endDate, setEndDate] = useState<Date>();

  const [dateSales, setDateSales] = useState({
    data: {
      salesQuantity: 0,
      mediumTicket: 0,
      totalValue: 0
    }
  });

  function handleStartDate(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedStartDate = event.target.value;
    setStartDate(new Date(selectedStartDate));
  }

  function handleEndDate(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedEndDate = event.target.value;
    setEndDate(new Date(selectedEndDate));
  }

  async function handleGetDate() {
    if (startDate !== undefined && endDate !== undefined) {
      const startDay = startDate.getDate() + 1;
      const startMonth = startDate.getMonth() + 1;
      const startYear = startDate.getFullYear();
      const endDay = endDate.getDate() + 1;
      const endMonth = endDate.getMonth() + 1;
      const endYear = endDate.getFullYear();

      const response = await getSalesBetweenDates(
        startDay as number,
        startMonth as number,
        startYear as number,
        endDay as number,
        endMonth as number,
        endYear as number
      );
      const salesData = response.data;

      if (!response.ok) {
        toast.error("Erro ao buscar vendas");
      } else {
        toast.success("Vendas carregadas com sucesso");
      }

      if (salesData) {
        setDateSales({
          data: {
            salesQuantity: salesData.salesQuantity,
            mediumTicket: salesData.mediumTicket,
            totalValue: salesData.totalValue
          }
        });
      } else {
        toast.error("Dados de vendas não encontrados");
      }
    }
  }

  useEffect(() => {
    if (startDate && endDate) handleGetDate();
  }, [startDate, endDate]);

  return (
    <Sales>
      <section>
        <CardSales className={raleway.className} type="month">
          <div className="card-header">
            <h2>Vendas</h2>
            <div>
              <legend>Data inicial</legend>
              <input
                type="date"
                className={poppins.className}
                placeholder="mm/aaaa"
                onChange={handleStartDate}
              />
            </div>

            <div>
              <legend>Data Final</legend>
              <input
                type="date"
                className={poppins.className}
                placeholder="mm/aaaa"
                onChange={e => {
                  handleEndDate(e);
                  handleGetDate();
                }}
              />
            </div>
          </div>

          <p>
            Vendas: R${" "}
            <span className={poppins.className}>
              {dateSales.data.totalValue.toFixed(2).replace(".", ",")}
            </span>
          </p>
          <p>
            Ticket médio: R${" "}
            <span className={poppins.className}>
              {dateSales.data.mediumTicket.toFixed(2).replace(".", ",")}
            </span>
          </p>
          <p>
            Total:{" "}
            <span className={poppins.className}>
              {dateSales.data.salesQuantity}
            </span>
          </p>
        </CardSales>
      </section>
    </Sales>
  );
}
