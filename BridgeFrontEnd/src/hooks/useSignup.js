import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signup = async ({
    name,
    legajo,
    username,
    password,
    confirmPassword,
  }) => {
    if (!name || !legajo || !username || !password || !confirmPassword) {
      toast.error("Debes completar todos los campos");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Las contraseñas no son iguales");
      return;
    }

    if (!isEducationalMail(username)) {
      toast.error("Solo puede crear una cuenta con un mail educativo");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          legajo,
          username,
          password,
          roles: "ROLE_USER",
        }),
      });

      if (!res.ok) throw new Error(res.status);

      toast.success("Cuenta creada exitosamente. Por favor, inicia sesion");
      return navigate("/login");
    } catch (error) {
      toast.error("Solicitud incorrecta. Por favor, verifica tus datos");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    signup,
  };
};

function isEducationalMail(mail) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.edu(\.[a-zA-Z]{2})?$/;
  return regex.test(mail);
}
