export const prepareHeaders = (headers:any) => {
  const token = localStorage.getItem("token");
  console.log(token)
  if (token) {
      headers.set("Authorization", `Bearer ${token}`);
  }

  return headers;
};