import authAxios from "./authAxios";

export const createTeam = async ({ teamName }) => {
  const { data } = await authAxios.post(`/api/v1/equipos/create`, null, {
    params: { nombreEquipo: teamName },
  });
  return data;
};

export const getMyTeams = async () => {
  const { data } = await authAxios.get("/api/v1/equipos/misEquipos");
  return data;
};
