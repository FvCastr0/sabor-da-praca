interface Response {
  message: string;
  ok: boolean;
}

export const updateSaleValue = async (
  id: string,
  value: number
): Promise<Response> => {
  const response = await fetch(`${process.env.BACKEND_URL}/sale/update`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`
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
