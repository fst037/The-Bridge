import authAxios from "./authAxios";

export const modifyIntroduction = async (introduction) => {
  const { data } = await authAxios.patch(
    `/api/v1/profile/modifyIntroduction?introduction=${introduction}`
  );
  return data;
};

export const modifyLink = async (links) => {
  const validLinks = links.filter((link) => link.value !== "");
  const { data } = await authAxios.patch(
    `/api/v1/profile/modificarLinksContacto`,
    validLinks
  );
  return data;
};

export const modifyUserInformation = async ({ introduction, links }) => {
  const responses = await Promise.all([
    modifyIntroduction(introduction),
    modifyLink(links),
  ]);

  return responses;
};

export default modifyUserInformation;

export const rateProfile = async ({ username, ratings }) => {
  console.log(ratings);
  console.log(username);
  const { data } = await authAxios.post(`/api/v1/interaccion/valorarPerfil`, {
    destinatario: username,
    votos: ratings,
    mensaje: "tipazo",
  });
  console.log(data);
  return data;
};
