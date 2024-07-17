import authAxios from "./authAxios";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

export const getLoggedUsername = () => {
  const credentials = localStorage.getItem("bridge-user");
  const { email } = JSON.parse(credentials);

  return email;
};

export const getUserData = async (email) => {
  const res = authAxios.get(`api/v1/auth/user/${email}`);
  return res;
};

export const getProfilePic = async (email) => {
  try {
    const imageRef = ref(storage, `profilePic/${email}`);
    const imageUrl = await getDownloadURL(imageRef);
    return imageUrl;
  } catch (error) {
    return `https://avatar.iran.liara.run/public/boy?username=${email}`;
  }
};

export const getUserDetail = async (username) => {
  const { data } = await authAxios.get(
    `http://localhost:8080/api/v1/profile/?username=${username}`
  );

  const addData = async (data) => await Promise.all(
    data.projects.map(async (project) => {
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

  await addData(data);

  return data;
};

export const getUserBuilders = async () => {
  const { data } = await authAxios.get("/api/v1/interaccion/misBuilders");

  const buildersWithProfilePic = await Promise.all(
    data.map(async (builder) => {
      const profilePic = await getProfilePic(builder.username);
      return {
        ...builder,
        profilePic,
      };
    })
  );

  return buildersWithProfilePic;
};

export const getUserRecommended = async () => {
  const { data } = await authAxios.get("/api/v1/interaccion/buildersEnComun");

  const recommendedWithProfilePic = await Promise.all(
    data.map(async (user) => {
      const profilePic = await getProfilePic(user.username);
      return {
        ...user,
        profilePic,
      };
    })
  );

  return recommendedWithProfilePic;
};

export const getUserKnown = async () => {
  const { data } = await authAxios.get("/api/v1/interaccion/conocidos");

  const knownWithProfilePic = await Promise.all(
    data.map(async (user) => {
      const profilePic = await getProfilePic(user.username);
      return {
        ...user,
        profilePic,
      };
    })
  );

  return knownWithProfilePic;
};

export const getComments = async () => {
  const { data } = await authAxios.get("/api/v1/interaccion/misComentarios");
  const commentsWithProfilePic = await Promise.all(
    data.map(async (user) => {
      const profilePic = await getProfilePic(user.remitente);
      return {
        ...user,
        profilePic,
      };
    })
  );

  return commentsWithProfilePic;
};
