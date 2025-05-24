export const verifySession = async (token: string) => {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/auth/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });

    if (response.status === 401) return "unauthorized";
  } catch (e) {
    return e;
  }
};
