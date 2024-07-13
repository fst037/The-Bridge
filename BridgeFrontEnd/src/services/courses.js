import { convertCourses } from "../utils/convertCourses";
import authAxios from "./authAxios";
import { getProfilePic } from "./getUserData";

export const getMyCourses = async () => {
  const { data } = await authAxios.get("/api/v1/cursos/misCursos");
  return data;
};

export const getSuggestions = async (course, groupSize = 3) => {
  const { data } = await authAxios.get(
    `/api/v1/sugerenciasEquipos/sugerirEquipos?courseCode=${course}&cantIntegrantes=${groupSize}`,
    { timeout: 1000 * 60 * 60 }
  );

  return data;
};

export const getCourseMembers = async (course) => {
  const { data } = await authAxios.get(
    `/api/v1/cursos/usuariosDeCurso?courseCode=${course}`
  );

  const dataWithProfilePic = await Promise.all(
    data.users.map(async (user) => {
      const profilePic = await getProfilePic(user.username);
      return {
        ...user,
        profilePic,
      };
    })
  );

  return {
    name: data.name,
    code: data.code,
    shift: data.shift,
    day: data.day,
    period: data.period,
    users: dataWithProfilePic,
  };
};

