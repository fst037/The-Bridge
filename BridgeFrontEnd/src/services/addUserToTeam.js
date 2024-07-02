import authAxios from "./authAxios";

export const addUserToTeam = async ({ username, identifier }) => {
  console.log(identifier);
  const { data } = await authAxios.post(
    `/api/v1/equipos/addStudent?username=${username}&identifier=${identifier}`
  );

  return data;
};
