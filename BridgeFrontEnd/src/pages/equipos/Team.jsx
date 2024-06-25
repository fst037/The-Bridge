import { FaUser, FaUsers } from "react-icons/fa";

export const Team = () => {
  return (
    <article className="flex flex-col min-h-20 p-2 gap-1 border border-gray-400 rounded-lg md:mx-8 md:flex-row">
      <div className="flex items-start gap-4 md:w-1/2">
        <p>Nombre de equipo</p>
        <div className="flex items-center gap-1">
          <FaUsers />
          <span>8</span>
        </div>
      </div>
      <hr className="h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400 md:h-auto md:w-px md:bg-gradient-to-b md:inline-block" />
      <div className="flex flex-col w-1/2 p-1 gap-2">
        <div className="flex items-center gap-2 cursor-pointer">
          <FaUser />
          <p>Integrante</p>
        </div>
      </div>
    </article>
  );
};
