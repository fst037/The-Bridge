import { Link } from "react-router-dom";
import Imagen1 from "../../assets/Imagen1.svg";
import { Header } from "./Header";

export const Home = () => {
  return (
    <div className="sm:max-h-screen h-screen w-full flex flex-col">
      <Header />
      <article className="flex flex-col h-auto md:flex-row h-fit">
        <img src={Imagen1} className="w-[100%] md:h-[600px] w-auto" />
        <div className="flex flex-col bg-[#112244] p-5 md:justify-center w-full">
          <h3 className="mb-4 md:mb-10 pb-2 text-center text-5xl font-bold text-white">
            ¡Conoce a tus compañeros!
          </h3>
          <p className="text-white md:text-2xl md:my-10 md:mx-32 leading-relaxed">
            ¿Alguna vez te paso que no conocías a nadie en tus clases? ¡Eso se acabó! Bridge te permite conocer a tus compañeros de clase y
            universidad, para que puedas estudiar juntos, hacer trabajos en
            equipo, y hasta hacer amigos. ¡Regístrate y comienza a disfrutar de
            tu experiencia universitaria hoy!
          </p>
        </div>
      </article>
      <ul className="flex justify-center align-center flex-grow bg-black">
        <li className="flex flex-col gap-5 flex-grow group w-1/2 max-w-[50%] hover:max-w-[70%] hover:w-[70%] transition-width duration-300">            
          <Link
            className="bg-button2 px-4 py-2 font-semibold text-white transition-all hover:bg-button2/60 h-full flex flex-col justify-center"
            to={"/register"}
          >
            <h2 className="pb-2 text-center font-bold md:text-2xl group-hover:text-4xl transition-text duration-300">
              ¿Primera vez en Brigde?
            </h2>
            <h4 className="text-center font-semibold md:text-xl group-hover:text-2xl transition-text duration-300">
              ¡Regístrate y transforma tu experiencia universitaria hoy!
            </h4>
          </Link>
        </li>
        <li className="flex flex-col gap-5 flex-grow group w-1/2 max-w-[50%] hover:max-w-[70%] hover:w-[70%] transition-width duration-300">            
          <Link
            className="bg-button1 px-4 py-2 font-semibold text-white transition-all hover:bg-button1/80 h-full flex flex-col justify-center"
            to={"/login"}
          >
            <h2 className="pb-2 text-center font-bold md:text-2xl group-hover:text-4xl transition-text duration-300">
              ¿Ya tienes cuenta?
            </h2>
            <h4 className="text-center font-semibold md:text-xl group-hover:text-2xl transition-text duration-300">
              ¡Inicia sesión y comienza a disfrutar de Bridge!
            </h4>
          </Link>
        </li>
      </ul>
    </div>
  );
};
