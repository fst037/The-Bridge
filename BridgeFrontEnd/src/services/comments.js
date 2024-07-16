import authAxios from "./authAxios";

export const commentProfile = async ({ username, message }) => {
  const { data } = await authAxios.post(`/api/v1/interaccion/comentarPerfil`, {
    mensaje: message,
    destinatario: username,
  });

  return data;
};

export const hideComment = async ({ user, timestamp }) => {
  const { data } = await authAxios.patch(
    `/api/v1/interaccion/ocultarComentario?remitente=${user}&timestamp=${timestamp}`
  );
  return data;
};

export const showComment = async ({ user, timestamp }) => {
  const { data } = authAxios.patch(
    `/api/v1/interaccion/mostrarComentario?remitente=${user}&timestamp=${timestamp}`
  );

  return data;
};
