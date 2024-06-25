import { useQuery } from "react-query";
import { Team } from "./Team";
import { getMyTeams } from "../../services/teams";
import { queryConfig } from "../../utils/queryConfig";
import { AddActionButton } from "../../components/AddActionButton";
import { useCardToggle } from "../../hooks/useCardToggle";
import { CreateTeamModal } from "../../components/CreateTeamModal";

export const Equipos = () => {
  const { data: teams } = useQuery("teams", getMyTeams, queryConfig);
  const { isOpen, setIsOpen, cardRef } = useCardToggle();

  return (
    <div className="p-8">
      <div className="flex flex-col gap-4">
        <h2 className="text-4xl text-gray-400/80">Equipos</h2>
        <AddActionButton
          text={"Nuevo +"}
          className="w-max"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        />
      </div>
      <main className="flex flex-col gap-2 md:gap-4 mt-4 md:mt-8">
        <Team />
        <Team />
        <Team />
        <Team />
      </main>
      <CreateTeamModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        cardRef={cardRef}
      />
    </div>
  );
};
