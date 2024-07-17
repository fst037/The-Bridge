import authAxios from "./authAxios";
import { getProfilePic } from "./getUserData";

export const getMyProjects = async () => {
  const { data } = await authAxios.get("/api/v1/proyectos/misProyectos");

  const projectsWithProfilePic = await Promise.all(
    data.map(async (project) => {
      project.members = await Promise.all(
        project.members.map(async (member) => {
          const profilePic = await getProfilePic(member.username);
          return {
            ...member,
            profilePic,
          };
        })
      );
    })
  );

  return data;
};

export const getProject = async (projectId) => {
  const { data } = await authAxios.get(
    `/api/v1/proyectos/deIdentifier?identifier=${projectId}`
  );

  const membersWithProfilePic = await Promise.all(
    data.members.map(async (member) => {
      const profilePic = await getProfilePic(member.username);
      member.profilePic = profilePic;
    })
  );

  return data;
};

export const createProject = async ({
  teamIdentifier,
  courseIdentifier,
  projectName,
}) => {
  const { data } = await authAxios.post("/api/v1/proyectos/crearProyecto", {
    equipoIdentifier: teamIdentifier,
    cursoIdentifier: courseIdentifier,
    titulo: projectName,
  });

  return data;
};

export const modifyProjectName = async ({ newName, projectId }) => {
  const { data } = await authAxios.patch(
    `/api/v1/proyectos/cambiarTitulo?identifier=${projectId}&titulo=${newName}`
  );
  return data;
};

export const modifyProjectDescription = async ({
  newDescription,
  projectId,
}) => {
  const { data } = await authAxios.patch(
    `/api/v1/proyectos/cambiarDescripcion?identifier=${projectId}&descripcion=${newDescription}`
  );
  return data;
};

export const addProjectLink = async ({ newLink, projectId }) => {
  const { data } = await authAxios.post(
    `/api/v1/proyectos/agregarLink?identifier=${projectId}&link=${newLink}`
  );
  return data;
};

export const deleteProjectLink = async ({ link, projectId }) => {
  const { data } = await authAxios.delete(
    `/api/v1/proyectos/eliminarLink?identifier=${projectId}&link=${link}`
  );
  return data;
};

export const deleteProject = async ({ projectId }) => {
  const { data } = await authAxios.delete(
    `/api/v1/proyectos/eliminarProyecto?identifier=${projectId}`
  );
  return data;
};
