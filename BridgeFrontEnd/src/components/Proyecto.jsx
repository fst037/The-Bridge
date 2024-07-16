import { Link } from "react-router-dom";
import { LinkIcon } from "./LinkIcon";
import { UserCard } from "./UserCard";

export const Proyecto = ({ project }) => {
  return (
    <div className="border border-gray-300 rounded-lg p-4 mt-4 h-full">
      <Link to={`/proyecto/${project?.identifier}`}>
        <h5 className="text-lg font-[500] mb-2">{project?.titulo}</h5>
      </Link>
      <div className="flex flex-col md:flex-row">
        <Link
          to={`/proyecto/${project?.identifier}`}
          className="w-auto h-auto max-w-40 md:mr-5 self-center"
        >
          <img src={project?.portadaLink} alt={project?.titulo} />
        </Link>
        <div>
          <h6 className="text-md font-[500] mt-2 md:mt-0">Descripción: </h6>
          <p className="ml-3 break-words text-left mt-1">
            {project?.descripcion}
          </p>
          <h6 className="text-md font-[500] mt-2">Links: </h6>
          <div className="flex gap-1 px-3 flex-col">
            {project.links &&
              project?.links.map((link) => <LinkIcon key={link} link={link} />)}
          </div>
        </div>
      </div>

      {project.curso && (
        <div>
          <h6 className="text-md font-[500] mt-2">Curso:</h6>
          <Link
            to={`/curso/${project.curso.code}`}
            className="text-blue-500 underline ml-3 break-words text-left mt-1"
          >
            {project?.curso.name}
          </Link>
        </div>
      )}

      {project.equipo && (
        <div>
          <h6 className="text-md font-[500] mt-2">Equipo:</h6>
          <Link
            to={`/equipo/${project?.equipo.identifier}`}
            className="text-blue-500 underline ml-3 break-words text-left mt-1"
          >
            {project?.equipo.nombre}
          </Link>
        </div>
      )}

      {project.members && (
        <div>
          <h6 className="text-md font-[500] mt-2">Miembros: </h6>
          <ul className="ml-3 mt-1">
            <div className="grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-2 items-start grow-1 mb-auto">
              {project?.members?.map(({ name, username, profilePic }) => (
                <UserCard
                  key={username}
                  profilePic={profilePic}
                  name={name}
                  username={username}
                  className={"w-full"}
                />
              ))}
            </div>
          </ul>
        </div>
      )}
    </div>
  );
};
