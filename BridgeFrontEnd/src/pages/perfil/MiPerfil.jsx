import { FaUser } from "react-icons/fa";

export const MiPerfil = () => {
  return (
    <article className="flex items-center h-[200px]">
      <div className="flex justify-center md:justify-end w-1/3">
        <FaUser className="size-16 md:size-24" />
      </div>
      <div className="flex flex-col items-center gap-8 w-2/3">
        <h3 className="text-2xl font-semibold">Nombre Apellido</h3>
        <p className="text-lg text-gray-600">Introduccion</p>
        <button className="bg-button2 hover:bg-[#FF573F] active:bg-[#FC3F24] px-6 py-1 rounded-md text-white">
          Editar perfil
        </button>
      </div>
    </article>
  );
};
