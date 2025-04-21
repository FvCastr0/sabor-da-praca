import { getSession } from "next-auth/react";

interface Response {
  message: string;
  ok: boolean;
}

export const updateSaleValue = async (
  id: string,
  value: number
): Promise<Response> => {
  const session = await getSession();
  const token = session?.accessToken;

  const response = await fetch(`${process.env.BACKEND_URL}/sale/update`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      id,
      value
    })
  });

  if (!response.ok) {
    return {
      message: "Erro ao atualizar venda",
      ok: false
    };
  } else
    return {
      message: "Venda atualizada com sucesso",
      ok: true
    };
};
