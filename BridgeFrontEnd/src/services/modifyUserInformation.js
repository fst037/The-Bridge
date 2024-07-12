import authAxios from "./authAxios";

export const modifyIntroduction = async (introduction) => {
  const { data } = await authAxios.patch(
    `/api/v1/profile/modifyIntroduction?introduction=${introduction}`
  );
  return data;
};

export const modifyLink = async (links) => {
  const validLinks = links.filter((link) => link.value !== "");
  const responses = await Promise.all(
    validLinks.map(async (link) => {
      const { data } = await authAxios.post(
        `/api/v1/profile/anadirLinkContacto?link=${link.value}`
      );
      return data;
    })
  );
  return responses;
};

export const modifyUserInformation = async ({ introduction, links }) => {
  const responses = await Promise.all([
    modifyIntroduction(introduction),
    modifyLink(links),
  ]);

  return responses;
};

export default modifyUserInformation;
