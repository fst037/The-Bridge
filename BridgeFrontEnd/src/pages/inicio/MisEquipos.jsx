import { createContext } from "react";
import { useQuery } from "react-query";
import { AddActionButton } from "../../components/AddActionButton";
import { InfoCard } from "../../components/InfoCard";
import { CreateTeamModal } from "./CreateTeamModal";
import { useCardToggle } from "../../hooks/useCardToggle";
import { getMyTeams } from "../../services/teams";
import toast from "react-hot-toast";

export const ModalContext = createContext();

export const MisEquipos = () => {
  const { cardRef, isOpen, setIsOpen } = useCardToggle();
  const { data: teams } = useQuery("teams", getMyTeams, {
    retry: false,
    onError: (error) => toast.error(error.message),
  });

  return (
    <section>
      <div className="mt-2">
        <div className="flex space-x-2 my-4">
          <h3 className="text-3xl">Mis Equipos</h3>
          <AddActionButton text={"Nuevo +"} onClick={() => setIsOpen(true)} />
        </div>
        <article className="grid grid-cols-[repeat(auto-fit,_minmax(400px,_1fr))] gap-4 my-4">
          {teams?.map((team) => (
            <InfoCard key={teams.identifier} title={team.nombre} />
          ))}
        </article>
      </div>
      <ModalContext.Provider
        value={{
          cardRef,
          isOpen,
          setIsOpen,
        }}
      >
        <CreateTeamModal />
      </ModalContext.Provider>
    </section>
  );
};
