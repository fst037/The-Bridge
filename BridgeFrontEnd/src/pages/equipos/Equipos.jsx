import { useMutation, useQuery } from "react-query";
import { Team } from "./Team";
import { getMyTeams } from "../../services/teams";
import { queryConfig } from "../../utils/queryConfig";
import { AddActionButton } from "../../components/AddActionButton";
import { useCardToggle } from "../../hooks/useCardToggle";
import { CreateTeamModal } from "../../components/CreateTeamModal";
import { getLoggedUsername } from "../../services/getUserData";
import { useState, useEffect } from "react";

export const Equipos = () => {
  const { data: teams, isLoading } = useQuery(
    "teams" + getLoggedUsername,
    getMyTeams,
    queryConfig
  );
  const { isOpen, setIsOpen, cardRef } = useCardToggle();
  const [searchName, setSearchName] = useState("");
  const [searchMember, setSearchMember] = useState("");
  const [filteredTeams, setFilteredTeams] = useState(teams);

  useEffect(() => {
    if (teams) {
      setFilteredTeams(
        teams.filter(({ team, estudiantes }) => {
          return (
            team.nombre.toLowerCase().includes(searchName.toLowerCase()) &&
            estudiantes
              .map((student) => student.name)
              .join()
              .toLowerCase()
              .includes(searchMember.toLowerCase())
          );
        })
      );
    }
  }, [teams, searchName, searchMember, isLoading]);

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <h2 className="text-4xl text-gray-400/80">Equipos</h2>
        <AddActionButton
          text={"Nuevo +"}
          className="w-full sm:w-max rounded-[15px]"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        />
      </div>

      {isLoading && <p>Cargando...</p>}
      {!isLoading && (
        <>
          <div className="flex mt-4 flex-col md:flex-row gap-4 mb-8">
            <input
              type="text"
              placeholder="Buscar equipo"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-4"
            />

            <select
              value={searchMember}
              onChange={(e) => setSearchMember(e.target.value)}
              className="w-full md:w-fit border border-gray-300 rounded-lg p-4 flex-grow"
            >
              <option value="">CUALQUIER MIEMBRO</option>
              {teams
                ?.map(({ estudiantes }) => estudiantes)
                .flat()
                .map((student) => student.name)
                .filter((value, index, self) => self.indexOf(value) === index)
                .map((student) => (
                  <option key={student} value={student}>
                    {student}
                  </option>
                ))}
            </select>
          </div>

          <main className="flex flex-col gap-2 md:gap-4 mt-4 md:mt-8">
            {filteredTeams?.map(({ team, estudiantes }) => (
              <Team key={team.identifier} students={estudiantes} team={team} />
            ))}
          </main>
        </>
      )}
      <CreateTeamModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        cardRef={cardRef}
      />
    </div>
  );
};
