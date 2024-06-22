import { convertCourses } from "../utils/convertCourses";
import authAxios from "./authAxios";

export const getMyCourses = async () => {
  const { data } = await authAxios.get("/api/v1/cursos/misCursos");
  const courses = convertCourses(data);
  return courses;
};
