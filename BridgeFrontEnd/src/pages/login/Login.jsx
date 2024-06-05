import "./index.css";
import { MdOutlineEmail } from "react-icons/md";
import { RiLock2Line } from "react-icons/ri";

export const Login = () => {
  return (
    <div className="w-screen h-screen grid place-items-center text-white body">
      <article
        className="flex flex-col sm:w-[350px] md:w-[450px] gap-12 p-8 bg-gray-950 rounded-2xl bg-clip-padding backdrop-filter 
        backdrop-blur-sm bg-opacity-50"
      >
        <h1 className="text-3xl font-bold text-center w-full">
          Bienvenido/a devuelta
        </h1>
        <div className="flex flex-col gap-4">
          <label className="flex flex-col mb-4 text-lg">
            Correo Electronico
            <div className="w-full relative flex items-center text-gray-500 focus-within:text-gray-950">
              <MdOutlineEmail className="size-6 absolute ml-2 pointer-events-none" />
              <input
                type="email"
                className="rounded-md outline-none pr-3 pl-10 py-2 w-full ring-gray-300 focus:ring-gray-800 focus:ring-2"
                placeholder="Introduce tu email"
              />
            </div>
          </label>
          <label className="flex flex-col mb-4 text-lg">
            Contraseña
            <div className="w-full relative flex items-center text-gray-500 focus-within:text-gray-950">
              <RiLock2Line className="size-6 absolute ml-2 pointer-events-none" />
              <input
                type="password"
                className="rounded-md outline-none pr-3 pl-10 py-2 w-full ring-gray-300 focus:ring-gray-800 focus:ring-2"
                placeholder="Introduce tu contraseña"
              />
            </div>
          </label>
          <p href="#" className="text-blue-500 underline hover:text-blue-700">
            Crea una cuenta
          </p>
          <button
            className="mt-6 rounded-md bg-button2 px-4 py-2 font-semibold text-white transition-all hover:bg-button2/80
          active:bg-button2"
          >
            Registrarse
          </button>
        </div>
      </article>
    </div>
  );
};
