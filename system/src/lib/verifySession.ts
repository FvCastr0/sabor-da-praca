export const verifySession = async (token: string) => {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/sale/update`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });

    if (response.status !== 200) return false;
    else return true;
  } catch (e) {
    return e;
  }
};
