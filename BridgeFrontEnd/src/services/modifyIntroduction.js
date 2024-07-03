import authAxios from "./authAxios";

export const modifyIntroduction = async (introduction) => {
  const { data } = await authAxios.patch(
    `/api/v1/auth/modifyIntroduction?introduction=${introduction}`
  );
  return data;
};
