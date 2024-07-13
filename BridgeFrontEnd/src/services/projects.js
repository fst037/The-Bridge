import authAxios from "./authAxios";

export const getMyProjects = async () => {
  const { data } = await authAxios.get("/api/v1/proyectos/misProyectos");
  return data;
};