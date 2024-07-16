import { useQuery } from "react-query";
import { getMyProjects } from "../../services/projects";
import { queryConfig } from "../../utils/queryConfig";
import { useState, useEffect } from "react";
import { AddActionButton } from "../../components/AddActionButton";
import { useCardToggle } from "../../hooks/useCardToggle";
import { getMyCourses } from "../../services/courses";
import { getMyTeams } from "../../services/teams";
import { CreateProjectModal } from "../../components/CreateProjectModal";
import { Proyecto } from "../../components/Proyecto";

export const Proyectos = () => {
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
            filteredProjects?.map((project) => {
              console.log(project);
              return <Proyecto key={project.identifier} project={project} />;
            })}
        </article>
      </div>

      <CreateProjectModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        cardRef={cardRef}
        teams={teams?.map((team) => team.team)}
        courses={courses}
      />
    </section>
  );
};
