import authAxios from "./authAxios";

export const getMyNofiticacions = async () => {
  const { data } = await authAxios.get(
    `/api/v1/interaccion/solicitudesRecibidasBuilder`
  );
  return data;
};

export const denyBuilder = async ({ username }) => {
  const { data } = await authAxios.delete(
    `/api/v1/interaccion/eliminarBuilder?builderEliminado=${username}`
  );
  return data;
};

export const acceptBuilder = async ({ username }) => {
  const { data } = await authAxios.post(
    `/api/v1/interaccion/aceptarSolicitudBuilder?remitente=${username}`
  );
  return data;
};

export const sendBuilderRequest = async ({ username }) => {
  const { data } = await authAxios.post(
    `/api/v1/interaccion/enviarSolicitudBuilder?destinatario=${username}`
  );
  return data;
};
