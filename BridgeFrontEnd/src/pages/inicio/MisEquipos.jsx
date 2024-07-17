import { createContext } from "react";
import { useQuery } from "react-query";
import { AddActionButton } from "../../components/AddActionButton";
import { InfoCard } from "../../components/InfoCard";
import { CreateTeamModal } from "../../components/CreateTeamModal";
import { useCardToggle } from "../../hooks/useCardToggle";
import { getMyTeams } from "../../services/teams";
import { queryConfig } from "../../utils/queryConfig";
import { Link } from "react-router-dom";

export const ModalContext = createContext();

export const MisEquipos = () => {
  const { cardRef, isOpen, setIsOpen } = useCardToggle();
  const { data: teams } = useQuery("teams", getMyTeams, queryConfig);

  return (
    <section>
      <div className="mt-2">
        <div className="flex space-x-2 my-4">
          <h3 className="text-3xl">Mis Equipos</h3>
          <AddActionButton text={"Nuevo +"} className="rounded-[15px]" onClick={() => setIsOpen(true)} />
        </div>
        <article className="flex flex-col md:grid md:grid-cols-[repeat(auto-fit,_minmax(400px,_1fr))] gap-4 my-4">
          {teams?.map(({ team }) => (
            <Link to={`/equipo/${team.identifier}`} key={team.identifier}>
              <InfoCard key={team.identifier} title={team.nombre} />
            </Link>
          ))}
        </article>
      </div>
      <CreateTeamModal
        cardRef={cardRef}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </section>
  );
};
