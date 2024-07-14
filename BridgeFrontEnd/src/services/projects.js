import authAxios from "./authAxios";

export const getMyProjects = async () => {
  const { data } = await authAxios.get("/api/v1/proyectos/misProyectos");
  return data;
};

export const createProject = async ({
  teamIdentifier,
  courseCode,
  projectName,
}) => {
  const { data } = await authAxios.post("/api/v1/proyectos/crearProyecto", {
    equipoIdentifier: teamIdentifier,
    cursoIdentifier: courseCode,
    titulo: projectName,
  });

  return data;
};
