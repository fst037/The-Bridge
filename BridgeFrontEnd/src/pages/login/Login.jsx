import "./index.css";
import { useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { RiLock2Line } from "react-icons/ri";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { FormInput } from "../../components/FormInput";
import { useLogin } from "../../hooks/useLogin";

export const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const { login, loading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(inputs);
  };

  return (
    <div className="w-screen h-screen grid place-items-center text-white body">
      <article
        className="flex flex-col sm:w-[350px] md:w-[450px] gap-12 p-8 bg-gray-950 rounded-2xl bg-clip-padding backdrop-filter 
        backdrop-blur-sm bg-opacity-50"
      >
        <h1 className="text-3xl font-bold text-center w-full">
          Bienvenido/a devuelta
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <label className="flex flex-col mb-4 text-lg">
            Correo Electronico
            <FormInput
              type={"email"}
              placeholder={"Introduce tu email educativo"}
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
              Icon={MdOutlineEmail}
            />
          </label>
          <label className="flex flex-col mb-4 text-lg">
            Contraseña
            <FormInput
              type={"password"}
              placeholder={"Introduce tu contraseña"}
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
              Icon={RiLock2Line}
            />
          </label>
          <button
            disabled={loading}
            className={`mt-6 rounded-md ${loading ? "bg-[#CF4734]" : "bg-button2"} px-4 py-2 font-semibold text-white transition-all hover:bg-[#ED6653]
          active:bg-[#E45946]`}
          >
            {loading ? <ClipLoader size={16} color="#fff" /> : "Iniciar sesion"}
          </button>
        </form>
        <p>
          ¿No tienes una cuenta?{" "}
          <Link className="underline hover:text-gray-200" to={"/register"}>
            Registrate
          </Link>
        </p>
      </article>
    </div>
  );
};
