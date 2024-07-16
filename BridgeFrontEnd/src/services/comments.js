import authAxios from "./authAxios";

export const commentProfile = async ({ username, message }) => {
  const { data } = await authAxios.post(`/api/v1/interaccion/comentarPerfil`, {
    mensaje: message,
    destinatario: username,
  });

  return data;
};

export const hideComment = async ({ username, timestamp }) => {
  const { data } = await authAxios.patch(
    `/api/v1/interaccion/ocultarComentario?remitente=${username}&timestamp=${timestamp}`
  );
  return data;
};

export const showComment = async ({ username, timestamp }) => {
  const { data } = authAxios.patch(
    `/api/v1/interaccion/mostrarComentario?remitente=${username}&timestamp=${timestamp}`
  );

  return data;
};

export const handleCommentVisibility = async ({
  username,
  timestamp,
  isHidden,
}) => {
  if (isHidden) {
    await showComment({ username, timestamp });
    return "Comentario visible";
  } else {
    await hideComment({ username, timestamp });
    return "Comentario ocultado";
  }
};
