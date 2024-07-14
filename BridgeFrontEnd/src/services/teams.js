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

export const getTeam = async ({ teamId }) => {
  console.log(teamId);
  const { data } = await authAxios.get(
    `/api/v1/equipos/porIdentifier?identifier=${teamId}`
  );

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

export const getCompleteTeamsSugestions = async ({
  teamMembers,
  teamIdentifier,
  courseCode,
}) => {
  const { data } = await authAxios.get(
    `/api/v1/sugerenciasEquipos/completarEquipo?courseCode=${courseCode}&cantIntegrantesFinales=${teamMembers}&teamId=${teamIdentifier}`
  );

  const suggestionsWithProfilePic = await Promise.all(
    data.map(async (suggestion) => {
      suggestion.members = await Promise.all(
        suggestion.members.map(async (student) => {
          const profilePic = await getProfilePic(student.username);
          return {
            ...student,
            profilePic,
          };
        })
      );
      return suggestion;
    })
  );

  return data;
};

export const getCreateTeamsSugestions = async ({ teamMembers, courseCode }) => {
  const { data } = await authAxios.get(
    `/api/v1/sugerenciasEquipos/sugerirEquipos?courseCode=${courseCode}&cantIntegrantes=${teamMembers}`
  );

  const suggestionsWithProfilePic = await Promise.all(
    data.map(async (suggestion) => {
      suggestion.members = await Promise.all(
        suggestion.members.map(async (student) => {
          const profilePic = await getProfilePic(student.username);
          return {
            ...student,
            profilePic,
          };
        })
      );
      return suggestion;
    })
  );

  return data;
};

export const deleteFromTeam = async ({ teamId, username }) => {
  const { data } = await authAxios.delete(
    `/api/v1/equipos/removeStudent?username=${username}&identifier=${teamId}`
  );
  return data;
};
