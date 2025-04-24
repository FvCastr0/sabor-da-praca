"use client";

import { CardSales } from "@/components/ui/CardSales";
import { InputTurn } from "@/components/ui/InputTurn";
import { Sales } from "@/components/ui/Sales";
import { poppins, raleway } from "@/components/ui/theme";
import { getDaySales } from "@/lib/getDaySales";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

export default function DaySalesClient() {
  const [selectedDate, setSelectedDate] = useState({
    day: 0,
    month: 0,
    year: 0
  });

  const [hasData, setHasData] = useState(false);

  const [daySales, setDaySales] = useState({
    peekHour: 0,
    salesQuantity: 0,
    mediumTicket: 0,
    totalValue: 0
  });
  const [turn, setTurn] = useState("morning");

  const [morningTurn, setMorningTurn] = useState({
    peekHour: 0,
    salesQuantity: 0,
    mediumTicket: 0,
    totalValue: 0
  });

  const [afternoonTurn, setAfternoonTurn] = useState({
    peekHour: 0,
    salesQuantity: 0,
    mediumTicket: 0,
    totalValue: 0
  });

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
        ...salesData.general,
        peekHour: Number(salesData.general.peekHour)
      });
    }
    if (salesData?.morningSales) {
      setMorningTurn({
        ...salesData.morningSales,
        peekHour: Number(salesData.morningSales.peekHour)
      });
    }
    if (salesData?.afternoonSales) {
      setAfternoonTurn({
        ...salesData.afternoonSales,
        peekHour: Number(salesData.afternoonSales.peekHour)
      });
    }
  }

  const handleTurnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTurn(event.target.value);
  };

  return (
    <div>
      <Sales>
        <div className={"sales-header"}>
          <h1 className={raleway.className}>Dia</h1>
          <input
            type="date"
            className={poppins.className}
            onChange={handleDateChange}
          />
        </div>

        <section>
          <CardSales className={raleway.className}>
            <div className="card-header">
              <h2>Vendas do dia</h2>
              {hasData && (
                <Link
                  href={`/table?day=${selectedDate.day}&month=${selectedDate.month}&year=${selectedDate.year}`}
                >
                  Ver tabela
                </Link>
              )}
            </div>

            <p>
              Vendas: R${" "}
              <span className={poppins.className}>
                {daySales.totalValue.toFixed(2).replace(".", ",")}
              </span>
            </p>
            <p>
              Ticket médio: R${" "}
              <span className={poppins.className}>
                {daySales.mediumTicket.toFixed(2).replace(".", ",")}
              </span>
            </p>
            <p>
              Horário de pico:{" "}
              <span className={poppins.className}>
                {daySales.peekHour} Horas
              </span>
            </p>
            <p>
              Total:{" "}
              <span className={poppins.className}>
                {daySales.salesQuantity}
              </span>
            </p>
          </CardSales>

          <CardSales className={raleway.className}>
            <div className="card-header">
              <h2>Vendas dos turnos</h2>

              <InputTurn>
                <div>
                  <input
                    type="radio"
                    id="turn1"
                    name="turns"
                    value="morning"
                    checked={turn === "morning"}
                    onChange={handleTurnChange}
                  />
                  <label htmlFor="turn1">Manhã</label>
                </div>

                <div>
                  <input
                    type="radio"
                    id="turn2"
                    name="turns"
                    value="afternoon"
                    checked={turn === "afternoon"}
                    onChange={handleTurnChange}
                  />
                  <label htmlFor="turn2">Tarde</label>
                </div>
              </InputTurn>
            </div>
            <p>
              Vendas: R${" "}
              <span className={poppins.className}>
                {turn === "morning"
                  ? morningTurn.totalValue.toFixed(2).replace(".", ",")
                  : afternoonTurn.totalValue.toFixed(2).replace(".", ",")}
              </span>
            </p>
            <p>
              Ticket médio: R${" "}
              <span className={poppins.className}>
                {turn === "morning"
                  ? morningTurn.mediumTicket.toFixed(2).replace(".", ",")
                  : afternoonTurn.mediumTicket.toFixed(2).replace(".", ",")}
              </span>
            </p>

            <p>
              Horário de pico:{" "}
              <span className={poppins.className}>
                {turn === "morning"
                  ? morningTurn.peekHour
                  : afternoonTurn.peekHour}{" "}
                Horas
              </span>
            </p>

            <p>
              Total:{" "}
              <span className={poppins.className}>
                {turn === "morning"
                  ? morningTurn.salesQuantity
                  : afternoonTurn.salesQuantity}
              </span>
            </p>
          </CardSales>
        </section>
      </Sales>
    </div>
  );
}
