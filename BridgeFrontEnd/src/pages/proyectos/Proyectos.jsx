import { useQuery } from "react-query";
import { getMyProjects } from "../../services/projects";
import { queryConfig } from "../../utils/queryConfig";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserCard } from "../../components/UserCard";
import { AddActionButton } from "../../components/AddActionButton";
import { useCardToggle } from "../../hooks/useCardToggle";
import { getMyCourses } from "../../services/courses";
import { getMyTeams } from "../../services/teams";
import { CreateProjectModal } from "../../components/CreateProjectModal";

const Proyectos = () => {
  const { data: projects } = useQuery("projects", getMyProjects, queryConfig);
  const { data: courses } = useQuery(
    "courses",
    () => getMyCourses(),
    queryConfig
  );
  const { data: teams } = useQuery("teams", () => getMyTeams(), queryConfig);

  const [searchName, setSearchName] = useState("");
  const [searchCourse, setSearchCourse] = useState("");
  const [searchTeam, setSearchTeam] = useState("");
  const [searchMember, setSearchMember] = useState("");
  const [filteredProjects, setFilteredProjects] = useState(projects);

  const { isOpen, setIsOpen, cardRef } = useCardToggle();

  useEffect(() => {
    if (projects) {
      setFilteredProjects(
        projects.filter((project) => {
          return (
            project?.titulo.toLowerCase().includes(searchName.toLowerCase()) &&
            project.curso.name
              .toLowerCase()
              .includes(searchCourse.toLowerCase()) &&
            project.equipo.nombre
              .toLowerCase()
              .includes(searchTeam.toLowerCase()) &&
            project.members
              .map((member) => member.name)
              .join()
              .toLowerCase()
              .includes(searchMember.toLowerCase())
          );
        })
      );
    }
  }, [projects, searchName, searchCourse, searchMember, searchTeam]);

  return (
    <section>
      <div className="p-4 md:p-8">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <h3 className="text-4xl text-gray-400/80">Mis Proyectos</h3>
          <AddActionButton
            text={"Nuevo +"}
            className="w-max rounded-[15px]"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          />
        </div>

        <div className="flex flex-wrap mt-4 flex-col md:flex-row gap-4 justify-between">
          <input
            type="text"
            placeholder="Buscar proyecto"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="border border-gray-300 rounded-lg p-4 min-w-[300px] flex-grow"
          />

          <select
            value={searchCourse}
            onChange={(e) => setSearchCourse(e.target.value)}
            className="w-full md:w-fit border border-gray-300 rounded-lg p-4 flex-grow"
          >
            <option value="">ANY</option>
            {projects
              ?.map((project) => project.curso.name)
              .filter((value, index, self) => self.indexOf(value) === index)
              .map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
          </select>

          <select
            value={searchTeam}
            onChange={(e) => setSearchTeam(e.target.value)}
            className="w-full md:w-fit border border-gray-300 rounded-lg p-4 flex-grow"
          >
            <option value="">ANY</option>
            {projects
              ?.map((project) => project.equipo.nombre)
              .filter((value, index, self) => self.indexOf(value) === index)
              .map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
          </select>

          <select
            value={searchMember}
            onChange={(e) => setSearchMember(e.target.value)}
            className="w-full md:w-fit border border-gray-300 rounded-lg p-4 flex-grow"
          >
            <option value="">ANY</option>
            {projects
              ?.map((project) => project.members)
              .flat()
              .map((member) => member.name)
              .filter((value, index, self) => self.indexOf(value) === index)
              .map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
          </select>
        </div>

        <article className="flex flex-col md:grid md:grid-cols-[repeat(auto-fit,_minmax(500px,_1fr))] gap-4 my-4">
          {projects &&
            filteredProjects.map((project) => (
              <div
                key={project.identifier}
                className="border border-gray-300 rounded-lg p-4 mt-4 h-full"
              >
                <Link to={`/proyecto/${project.identifier}`}>
                  <h5 className="text-lg font-[500] mb-2">{project.titulo}</h5>
                </Link>
                <div className="flex flex-col md:flex-row">
                  <Link
                    to={`/proyecto/${project.identifier}`}
                    className="w-auto h-auto max-w-40 md:mr-5 self-center"
                  >
                    <img src={project.portadaLink} alt={project.titulo} />
                  </Link>
                  <div>
                    <h6 className="text-md font-[500] mt-2 md:mt-0">
                      Descripción:{" "}
                    </h6>
                    <p className="ml-3 break-words text-left mt-1">
                      {project.descripcion}
                    </p>
                    <h6 className="text-md font-[500] mt-2">Links: </h6>
                    <ul className="ml-3 mt-1">
                      {project.links &&
                        project.links.map((link) => (
                          <li key={link}>
                            <a
                              href={link}
                              target="_blank"
                              rel="noreferrer"
                              className="text-sm text-blue-500 underline break-all text-left"
                            >
                              {link}
                            </a>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h6 className="text-md font-[500] mt-2">Curso:</h6>
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
                      {project.members?.map(
                        ({ name, username, profilePic }) => (
                          <UserCard
                            key={username}
                            profilePic={profilePic}
                            name={name}
                            username={username}
                            className={"w-full"}
                          />
                        )
                      )}
                    </div>
                  </ul>
                </div>
              </div>
            ))}
        </article>
      </div>

      <CreateProjectModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        cardRef={cardRef}
        teams={teams.map((team) => team.team)}
        courses={courses}
      />
    </section>
  );
};

export default Proyectos;
