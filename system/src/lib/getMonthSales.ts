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

export const getMonthSales = async (
  month: number,
  year: number
): Promise<Response> => {
  const session = await getSession();
  const token = session?.accessToken;

  const response = await fetch(
    `${process.env.BACKEND_URL}/sale/datamonth?month=${month}&year=${year}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  if (response.status === 401) {
    return {
      message: "INVALID-USER",
      ok: false
    };
  }

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
