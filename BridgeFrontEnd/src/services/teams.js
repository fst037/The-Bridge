import authAxios from "./authAxios";
import { getProfilePic } from "./getUserData";

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

export const getTeam = async (teamId) => {
  const { data } = await authAxios.get(`/api/v1/equipos/porIdentifier?identifier=${teamId}`);

  const usersWithProfilePic = await Promise.all(
    data.equipo.estudiantes.map(async (user) => {
      const profilePic = await getProfilePic(user.username);
      return {
        ...user,
        profilePic,
      };
    })
  );

  return {
    team: data,
    users: usersWithProfilePic,
  };
};

export const getTeamsSugestions = async ({teamMembers, teamIdentifier, courseCode}) => {
  const { data } = await authAxios.get(`/api/v1/sugerenciasEquipos/completarEquipo?courseCode=${courseCode}&cantIntegrantesFinales=${teamMembers}&teamId=${teamIdentifier}`);

  return data;
};
