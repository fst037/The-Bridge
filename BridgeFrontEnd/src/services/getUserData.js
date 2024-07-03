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
