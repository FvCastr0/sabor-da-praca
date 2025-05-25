import { getSession } from "next-auth/react";

interface Response {
  message: string;
  data?: {
    salesQuantity: number;
    mediumTicket: number;
    peekHour: string;
    totalValue: number;
  };
  ok: boolean;
}

export const getSalesBetweenDates = async (
  startDay: number,
  startMonth: number,
  startYear: number,
  endDay: number,
  endMonth: number,
  endYear: number
): Promise<Response> => {
  const session = await getSession();
  const token = session?.accessToken;

  const response = await fetch(
    `${process.env.BACKEND_URL}/sale/data/betweenDates?startDay=${startDay}&startMonth=${startMonth}&startYear=${startYear}&endDay=${endDay}&endMonth=${endMonth}&endYear=${endYear}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  if (!response.ok) {
    return {
      message: "Erro ao buscar vendas",
      ok: false
    };
  } else {
    const data = await response.json().then(req => req.data);
    return {
      message: "Vendas carregadas com sucesso",
      data,
      ok: true
    };
  }
};
