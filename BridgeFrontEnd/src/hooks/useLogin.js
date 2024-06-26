import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getProfilePic } from "../services/getUserData";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const navigate = useNavigate();

  const login = async ({ username, password }) => {
    if (!username || !password) toast.error("Debes completar todos los campos");
    try {
      setLoading(true);
      const encodedCredentials = btoa(`${username}:${password}`);
      const authorizationHeader = `Basic ${encodedCredentials}`;

      const res = await fetch("/api/v1/auth/me", {
        method: "GET",
        headers: { Authorization: authorizationHeader },
      });

      if (!res.ok) throw new Error("Error al iniciar sesion");

      const profilePic = await getProfilePic(username);
      const newAuthUser = {
        token: authorizationHeader,
        email: username,
        profilePic,
      };

      setAuthUser(newAuthUser);
      localStorage.setItem("bridge-user", JSON.stringify(newAuthUser));
      toast.success("Inicio de sesion exitoso");

      return navigate("/inicio");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    login,
  };
};
