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
    `${process.env.BACKEND_URL}/sale/month?&month=${month}&year=${year}`,
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
  } else
    return {
      message: "Vendas carregadas com sucesso",
      data: await response.json(),
      ok: true
    };
};
