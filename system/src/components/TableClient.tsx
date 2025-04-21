"use client";

import { SalesTableStyles } from "@/components/ui/StyledTable";
import { poppins, raleway } from "@/components/ui/theme";
import { getDaySales } from "@/lib/getDaySales";
import { updateSaleValue } from "@/lib/updateSaleValue";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Sale {
  id: string;
  value: number;
  date: string;
}

export default function TableClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [sales, setSales] = useState<Sale[]>([]);

  const day = Number(searchParams.get("day"));
  const month = Number(searchParams.get("month"));
  const year = Number(searchParams.get("year"));

  useEffect(() => {
    if (!day || !month || !year || day === 0 || month === 0 || year === 0) {
      router.push("/");
      return;
    }

    getDaySales(day, month, year)
      .then(response => {
        if (!response.ok) {
          router.push("/");
          return;
        }
        setSales(response.data?.data.general.sales.sales || []);
      })
      .catch(() => {
        router.push("/");
      });
  }, [day, month, year, router]);

  function convertSaleDateToTime(saleDate: string) {
    const convertedDate = new Date(saleDate);
    const hours = convertedDate.getHours();
    const minutes = convertedDate.getMinutes();
    return `${hours}:${minutes}`;
  }

  function handleEditSale(saleId: string) {
    const newValue = prompt("Digite o novo valor da venda:");
    if (newValue) {
      updateSaleValue(saleId, Number(newValue))
        .then(response => {
          if (!response.ok) {
            alert("Erro ao atualizar a venda");
            return;
          }
          setSales(prevSales =>
            prevSales.map(sale =>
              sale.id === saleId ? { ...sale, value: Number(newValue) } : sale
            )
          );
        })
        .catch(() => {
          alert("Erro ao atualizar a venda");
        });
    }
  }

  return (
    <SalesTableStyles>
      <div className="header">
        <h1 className={poppins.className}>
          Vendas do dia {day}/{month.toString().padStart(2, "0")}/{year}
        </h1>
        <Link href={"/"} className={raleway.className}>
          Voltar ao menu principal
        </Link>
      </div>
      <table>
        <thead className={raleway.className}>
          <tr>
            <th>Valor</th>
            <th>Horário</th>
            <td>Editar</td>
          </tr>
        </thead>
        <tbody className={poppins.className}>
          {sales.map(sale => (
            <tr key={sale.id}>
              <td>{sale.value}</td>
              <td>{convertSaleDateToTime(sale.date)}</td>
              <td>
                <Image
                  src={"/edit.svg"}
                  alt="Edit icon"
                  width={24}
                  height={24}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleEditSale(sale.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </SalesTableStyles>
  );
}
