import authAxios from "./authAxios";
import { getProfilePic } from "./getUserData";

export const getMyCourses = async () => {
  const { data } = await authAxios.get("/api/v1/cursos/misCursos");
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

export const isUserAvailable = async (courseCode) => {
  const { data } = await authAxios.get(
    `/api/v1/cursos/obtenerDisponibilidad?courseCode=${courseCode}`
  );
  return data;
};

export const setUserAvailability = async (courseCode, isAvailable) => {
  const { data } = await authAxios.patch(
    `/api/v1/cursos/marcarDisponibilidad?courseCode=${courseCode}&disponibilidad=${isAvailable}`
  );
  return data;
};
