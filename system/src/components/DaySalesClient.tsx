"use client";

import { CardSales } from "@/components/ui/CardSales";
import { Sales } from "@/components/ui/Sales";
import { poppins, raleway } from "@/components/ui/theme";
import { getDaySales } from "@/lib/getDaySales";
import { Sale } from "@/types/Sale";
import Link from "next/link";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import { DaySalesChartWrapper } from "./ChartWrapper";

export default function DaySalesClient() {
  const [selectedDate, setSelectedDate] = useState({
    day: 0,
    month: 0,
    year: 0
  });
  const [hasData, setHasData] = useState(false);
  const [turn, setTurn] = useState<string>("geral");

  const [daySales, setDaySales] = useState({
    geral: {
      sales: [] as Sale[],
      peekHour: 0,
      salesQuantity: 0,
      mediumTicket: 0,
      totalValue: 0
    },
    morning: {
      peekHour: 0,
      salesQuantity: 0,
      mediumTicket: 0,
      totalValue: 0
    },
    afternoon: {
      peekHour: 0,
      salesQuantity: 0,
      mediumTicket: 0,
      totalValue: 0
    }
  });

  const formatCurrency = (value: number) => value.toFixed(2).replace(".", ",");

  const switchTurns = useMemo(() => {
    switch (turn) {
      case "morning":
        return {
          peekHour: daySales.morning.peekHour,
          salesQuantity: daySales.morning.salesQuantity,
          mediumTicket: daySales.morning.mediumTicket,
          totalValue: daySales.morning.totalValue
        };
      case "afternoon":
        return {
          peekHour: daySales.afternoon.peekHour,
          salesQuantity: daySales.afternoon.salesQuantity,
          mediumTicket: daySales.afternoon.mediumTicket,
          totalValue: daySales.afternoon.totalValue
        };
      case "geral":
        return {
          peekHour: daySales.geral.peekHour,
          salesQuantity: daySales.geral.salesQuantity,
          mediumTicket: daySales.geral.mediumTicket,
          totalValue: daySales.geral.totalValue
        };
      default:
        return {
          peekHour: 0,
          salesQuantity: 0,
          mediumTicket: 0,
          totalValue: 0
        };
    }
  }, [turn, daySales]);

  async function handleDateChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedDate = event.target.value;
    const date = new Date(selectedDate);
    const day = date.getDate() + 1;
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const response = await getDaySales(day, month, year);

    if (!response.ok) {
      toast.error("Erro ao buscar vendas");
      setHasData(false);
    } else {
      toast.success("Vendas carregadas com sucesso");
      setHasData(true);
      setSelectedDate({
        day,
        month,
        year
      });
    }

    const salesData = response.data?.data;

    if (salesData?.general) {
      setDaySales({
        geral: {
          ...salesData.general,
          sales: salesData.general.sales.sales,
          peekHour: Number(salesData.general.peekHour)
        },

        morning: {
          ...salesData.morningSales,
          peekHour: Number(salesData.morningSales.peekHour)
        },

        afternoon: {
          ...salesData.afternoonSales,
          peekHour: Number(salesData.afternoonSales.peekHour)
        }
      });
    }
  }

  const handleTurnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTurn(event.target.value);
  };

  return (
    <div>
      <Sales>
        <section>
          <CardSales
            className={raleway.className}
            type={hasData ? "bigger" : ""}
          >
            <div>
              <div className="card-header">
                <div>
                  <h2>Vendas do dia</h2>
                  {hasData && (
                    <Link
                      href={`/table?day=${selectedDate.day}&month=${selectedDate.month}&year=${selectedDate.year}`}
                    >
                      Ver tabela
                    </Link>
                  )}
                </div>

                <article>
                  <input
                    type="date"
                    className={poppins.className}
                    onChange={handleDateChange}
                  />

                  {hasData && (
                    <select
                      name="turno"
                      value={turn}
                      onChange={handleTurnChange}
                      className={poppins.className}
                    >
                      <option value="">Selecionar turno</option>
                      <option value="geral">Geral</option>
                      <option value="morning">Manhã</option>
                      <option value="afternoon">Tarde</option>
                    </select>
                  )}
                </article>
              </div>

              <p>
                Vendas: R${" "}
                <span className={poppins.className}>
                  {formatCurrency(switchTurns.totalValue)}
                </span>
              </p>
              <p>
                Ticket médio: R${" "}
                <span className={poppins.className}>
                  {formatCurrency(switchTurns.mediumTicket)}
                </span>
              </p>
              <p>
                Horário de pico:{" "}
                <span className={poppins.className}>
                  {switchTurns.peekHour} Horas
                </span>
              </p>
              <p>
                Total:{" "}
                <span className={poppins.className}>
                  {switchTurns.salesQuantity}
                </span>
              </p>
            </div>
            <DaySalesChartWrapper data={daySales.geral.sales} />
          </CardSales>
        </section>
      </Sales>
    </div>
  );
}
