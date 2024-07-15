import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getProject } from "../../services/projects";
import { queryConfig } from "../../utils/queryConfig";
import { UserCard } from "../../components/UserCard";
import { Link } from "react-router-dom";
import { LinkIcon } from "../../components/LinkIcon";

export const ProyectoEspecifico = () => {
  const { projectId } = useParams();
  const { data: project, isLoading } = useQuery(
    "projectInformation" + projectId,
    () => getProject(projectId),
    queryConfig
  );

  return (
    <div className="p-4 md:p-8">
      {isLoading && <p>Cargando...</p>}
      {!isLoading && (
        <>
          <h2 className="text-4xl text-gray-400/80 mb-4">{project.titulo}</h2>
          <div className="flex flex-col md:flex-row">
            <div className="w-auto md:mr-5 self-center">
              <img
                src={project.portadaLink}
                className="max-h-[300px]"
                alt={project.titulo}
              />
            </div>
            <div className="w-full">
              <div className="border border-gray-300 rounded-lg p-4 h-full w-full">
                <div className="flex flex-col md:flex-row">
                  <div>
                    <h6 className="text-md font-[500] mt-2 md:mt-0">
                      Descripción:{" "}
                    </h6>
                    <p className="ml-3 break-words text-left mt-1">
                      {project.descripcion}
                    </p>
                    <h6 className="text-md font-[500] mt-2">Links: </h6>
                    <div className="flex gap-2 px-3">
                      {project.links &&
                        project.links.map((link) => (
                          <LinkIcon key={link} link={link} />
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col border border-gray-300 rounded-lg p-4 h-full flex-grow w-full mt-5">
            <div>
              <h6 className="text-md font-[500]">Curso:</h6>
              <Link
                to={`/curso/${project.curso.identifier}`}
                className="text-blue-500 underline ml-3 break-words text-left mt-1"
              >
                {project.curso.name}
              </Link>
            </div>

            <div>
              <h6 className="text-md font-[500] mt-2">Equipo:</h6>
              <Link
                to={`/equipo/${project.equipo.identifier}`}
                className="text-blue-500 underline ml-3 break-words text-left mt-1"
              >
                {project.equipo.nombre}
              </Link>
            </div>

            <div>
              <h6 className="text-md font-[500] mt-2">Miembros: </h6>
              <ul className="ml-3 mt-1">
                <div className="grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-2 items-start grow-1 mb-auto">
                  {project.members?.map(({ name, username, profilePic }) => (
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
          </div>
        </>
      )}
    </div>
  );
};
