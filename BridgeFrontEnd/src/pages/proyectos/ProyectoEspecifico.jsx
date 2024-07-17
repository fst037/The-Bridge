import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteProjectLink, getProject } from "../../services/projects";
import { queryConfig } from "../../utils/queryConfig";
import { UserCard } from "../../components/UserCard";
import { Link } from "react-router-dom";
import { LinkIcon } from "../../components/LinkIcon";
import { useAuthContext } from "../../context/AuthContext";
import { RiPencilLine } from "react-icons/ri";
import { useCardToggle } from "../../hooks/useCardToggle";
import { ModifyProjectNameModal } from "../../components/ModifyProjectNameModal";
import { FaTrash } from "react-icons/fa6";
import toast from "react-hot-toast";
import { AddLinkToProjectModal } from "../../components/AddLinkToProjectModal";
import { IoMdAddCircle } from "react-icons/io";
import { ModifyProjectDescriptionModal } from "../../components/ModifyProjectDescriptionModal";

export const ProyectoEspecifico = () => {
  const { authUser } = useAuthContext();
  const { projectId } = useParams();
  const { data: project, isLoading } = useQuery(
    "projectInformation" + projectId,
    () => getProject(projectId),
    queryConfig
  );
  const {
    cardRef: newLinkCard,
    isOpen: isOpenLinkCard,
    setIsOpen: setIsOpenLinkCard,
  } = useCardToggle();
  const {
    cardRef: DescriptionCard,
    isOpen: isOpenDescriptionCard,
    setIsOpen: setIsOpenDescriptionCard,
  } = useCardToggle();
  const { cardRef, isOpen, setIsOpen } = useCardToggle();
  const queryClient = useQueryClient();
  let isMember = false;

  for (let member of project?.members || []) {
    if (member.username === authUser.email) {
      isMember = true;
      break;
    }
  }

  const deleteLinkMutation = useMutation(deleteProjectLink, {
    onSuccess: () => {
      queryClient.invalidateQueries("projectInformation" + projectId);
      toast.success("Link eliminado correctamente");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handleDeleteLink = (link) => {
    deleteLinkMutation.mutate({ projectId, link });
  };

  return (
    <div className="p-4 md:p-8">
      {isLoading && <p>Cargando...</p>}
      {!isLoading && (
        <>
          <h2 className="flex items-center text-4xl text-gray-400/80 mb-4">
            {project.titulo}
            {isMember ? (
              <RiPencilLine
                className="cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
              />
            ) : (
              ""
            )}
          </h2>
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
                    <h6 className="flex items-center gap-1 text-md font-[500] mt-2 md:mt-0">
                      Descripción
                      {isMember ? (
                        <RiPencilLine
                          className="cursor-pointer"
                          onClick={() =>
                            setIsOpenDescriptionCard(!isOpenDescriptionCard)
                          }
                        />
                      ) : (
                        ""
                      )}
                    </h6>
                    <p className="ml-3 break-words text-left mt-1">
                      {project.descripcion}
                    </p>
                    <h6 className="flex gap-1 items-center text-md font-[500] mt-2">
                      <span>Links</span>
                      <IoMdAddCircle
                        onClick={() => setIsOpenLinkCard(!isOpenLinkCard)}
                      />
                    </h6>
                    <div className="flex flex-col gap-1 px-3">
                      {project.links &&
                        project.links.map((link) => (
                          <div key={link} className="flex gap-1 items-center">
                            <LinkIcon key={link} link={link} />
                            <FaTrash
                              className="size-4 cursor-pointer"
                              onClick={() => handleDeleteLink(link)}
                            />
                          </div>
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
      <ModifyProjectNameModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        cardRef={cardRef}
        project={project}
      />
      <AddLinkToProjectModal
        isOpen={isOpenLinkCard}
        setIsOpen={setIsOpenLinkCard}
        cardRef={newLinkCard}
        project={project}
      />
      <ModifyProjectDescriptionModal
        isOpen={isOpenDescriptionCard}
        setIsOpen={setIsOpenDescriptionCard}
        cardRef={DescriptionCard}
        project={project}
      />
    </div>
  );
};
