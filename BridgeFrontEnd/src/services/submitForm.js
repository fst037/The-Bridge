import authAxios from "./authAxios";

export const submitForm = async (responses) => {
  const { data } = await authAxios.post(
    "/api/v1/interaccion/enviarEncuestaHabilidades",
    responses
  );

  return data;
};
