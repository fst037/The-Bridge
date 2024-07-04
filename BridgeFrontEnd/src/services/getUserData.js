import authAxios from "./authAxios";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";
import axios from "axios";

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
  const { data } = await axios.get(
    `http://localhost:8080/api/v1/profile/?username=${username}`
  );
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
