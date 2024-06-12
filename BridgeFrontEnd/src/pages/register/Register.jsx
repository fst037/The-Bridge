import "./index.css";
import { useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { RiLock2Line } from "react-icons/ri";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { LuBinary } from "react-icons/lu";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { useSignup } from "../../hooks/useSignup";
import { FormInput } from "../../components/FormInput";

export const Register = () => {
  const [inputs, setInputs] = useState({
    name: "",
    legajo: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const { signup, loading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
  };

  return (
    <div className="w-screen h-screen grid place-items-center text-center text-white body">
      <article
        className="flex flex-col sm:w-[350px] md:w-[450px] gap-4 md:gap-12 p-8 bg-gray-950 rounded-2xl bg-clip-padding backdrop-filter 
        backdrop-blur-sm bg-opacity-50 text-start"
      >
        <h1 className="text-3xl font-bold">Bienvenido/a a Bridge</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <label className="flex flex-col mb-4 text-lg">
            Nombre
            <FormInput
              type={"text"}
              value={inputs.name}
              placeholder={"Introduce su nombre"}
              onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
              Icon={MdDriveFileRenameOutline}
            />
          </label>
          <label className="flex flex-col mb-4 text-lg">
            Legajo
            <FormInput
              type={"number"}
              value={inputs.legajo}
              placeholder={"Introduce su numero de legajo"}
              onChange={(e) => setInputs({ ...inputs, legajo: e.target.value })}
              Icon={LuBinary}
            />
          </label>
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
              placeholder={"Introduce una contraseña"}
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
              Icon={RiLock2Line}
            />
          </label>
          <label className="flex flex-col mb-4 text-lg">
            Confirmar contraseña
            <FormInput
              type={"password"}
              placeholder={"Confirma la contraseña"}
              value={inputs.confirmPassword}
              onChange={(e) =>
                setInputs({ ...inputs, confirmPassword: e.target.value })
              }
              Icon={RiLock2Line}
            />
          </label>
          <button
            disabled={loading}
            className={`rounded-md ${loading ? "bg-[#CF4734]" : "bg-button2"} px-4 py-2 font-semibold text-white transition-all hover:bg-[#ED6653]
          active:bg-[#E45946]`}
          >
            {loading ? <ClipLoader size={16} color="#fff" /> : "Registrarse"}
          </button>
        </form>
        <p>
          ¿Ya tienes una cuenta?{" "}
          <Link className="underline hover:text-gray-200" to={"/login"}>
            Inicia sesion
          </Link>
        </p>
      </article>
    </div>
  );
};
