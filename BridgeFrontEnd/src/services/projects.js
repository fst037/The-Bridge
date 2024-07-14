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